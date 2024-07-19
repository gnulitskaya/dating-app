import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  private apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  constructor(private http: HttpClient) { }

  searchAddress(e: any, _type: string, bounds: string, locations?: any) {
    let ev = e.target?.value;
    return this.http.post(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, {
      query: ev,
      // type: type,
      // bounds: bounds,
      // constraints: constraints,
      from_bound: { value: bounds },
      to_bound: { value: bounds },
      // restrict_value: true,
      // hint: false,
      locations: locations
    }, {
      headers: {
        "Authorization": 'Token a8195ff393ba3159d1a4547f14e5fd4325c54ed8'
      }
    });
  }
}