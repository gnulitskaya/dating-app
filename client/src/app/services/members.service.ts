import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member } from '../models/member';
import { Observable, map, of } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginationResult: PaginatedResult<Member[] | null> = new PaginatedResult<Member[] | null>();
  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    // if (this.members.length > 0) return of(this.members);
    if(page !== null && itemsPerPage!== null) {
      params = params.append('pageNumber', page!.toString());
      params = params.append('pageSize', itemsPerPage!.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
        // this.members = members;
        // return members;
        this.paginationResult.result = response.body;
        
        if(response.headers.get('Pagination')!== null) {
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        return this.paginationResult;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(member => member.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.findIndex(m => m.id === member.id);
        this.members[index] = member;
        return member;
      })
    );
  }

  sendPhoto(file: File): any {
    let data = new FormData();

    data.append('file', file);
    return this.http.post(this.baseUrl + 'users/add-photo',
      data
    )
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

}
