import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member } from '../models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user!: User;
  userParams!: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user;
        this.userParams = new UserParams(user);
      }
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() { 
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);

    console.log(this.memberCache);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
      .pipe(
        map(response => {
          this.memberCache.set(Object.values(userParams).join('-'), response);
          return response;
        })
      );
  }

  private getPaginatedResult<T>(url: string, params: any) {
    const paginationResult: PaginatedResult<T | null> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body;

        if (response.headers.get('Pagination') !== null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        return paginationResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  getMember(username: string): Observable<Member> {
    // const member = this.members.find(member => member.username === username);
    // if (member !== undefined) return of(member);
    const member = [...this.memberCache.values()]
      .reduce((prev, curr) => prev.concat(curr.result), [])
      .find((member: Member) => member.username === username);
    // console.log(member);

    if (member) return of(member);
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
