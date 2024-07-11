import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  private apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  constructor(private http: HttpClient) { }

  getSuggestions(query: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 5d2f272590b706a01ecbd5ebecc6f4af5c3e88fe'
    };

    return this.http.post(this.apiUrl, { query }, { headers });
  }
}