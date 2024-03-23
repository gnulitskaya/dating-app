import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  currentUser: User | null = null;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1))
    .subscribe((user: User | null) => 
      this.currentUser = user);
      if (this.currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.currentUser.token}`
          }
        })
    }

    return next.handle(request);
  }
}