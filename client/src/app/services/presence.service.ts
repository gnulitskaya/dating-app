import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  hubConnection: HubConnection | null = null;

  private onlineUsersSource  = new BehaviorSubject<string[]>([]);
  public onlineUsers$  = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router,
    private snackbar: SnackbarService
  ) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error => {
        console.log(error);
        this.toastr.error('error!', error)
      });

    this.hubConnection.on('UserIsOnline', username => {
      console.log('has joined the chat!');
      
      // this.toastr.info(username +'has joined the chat!');
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames, username])
      })
    })

    this.hubConnection.on('UserIsOffline', username => {
      // this.toastr.info(username  + 'has left the chat!')
      console.log('has left the chat!');
      
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      })
    })

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    })

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      // this.snackbar.openSnackBar(username, 'has sent you a new message!');
      console.log('message received!');
      this.toastr.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    })
  }

  stopHubConnection() {
    console.log('stopping hub connection');
    
    this.hubConnection?.stop().catch(error => console.log(error));
  }
}
