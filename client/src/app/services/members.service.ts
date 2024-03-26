import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(this.baseUrl + 'users', member);
  }
}
