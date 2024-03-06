import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'App Dating';
  users: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users')
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
