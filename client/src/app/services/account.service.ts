import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/api/';

  isAuth$!: Observable<User | null>;

  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((res: any) => {
        const user = res as User;
        if(res) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/members');
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user as User);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
    this.isAuth$ = this.currentUser$;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
