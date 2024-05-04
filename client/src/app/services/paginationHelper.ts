import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';

export function getPaginatedResult<T>(url: string, params: any, http: HttpClient) {
    const paginatedResult: PaginatedResult<T | null> = new PaginatedResult<T | null>();
    return http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
            const paginationHeader = response.headers.get('Pagination');
            if (typeof paginationHeader === 'string') {
              paginatedResult.pagination = JSON.parse(paginationHeader);
            }
          }
        return paginatedResult;
      })
    );
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }