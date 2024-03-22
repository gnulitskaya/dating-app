import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

const user = localStorage.getItem('user');
const httpOptions = {
  headers: new HttpHeaders({ 
    Authorization: 'Bearer '+ (user ? JSON.parse(user)?.token : null),
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
  }
}
