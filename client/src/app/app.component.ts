import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'App Dating';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {

  }

  ngOnInit(): void {
    // this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') ?? '');
      this.accountService.setCurrentUser(user);
    }
  }

  getUsers() {
    this.http.get('http://localhost:5001/api/users')
      .pipe(
        tap(users => {
          this.users = users;
          console.log('users', users);
        }),
        catchError((err: any) => {
          console.log('err', err);
          return err;
        })
      )
      .subscribe()
  }
}
