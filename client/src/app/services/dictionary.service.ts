import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Breed } from "../models/breeds";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DictionaryService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    
    getBreeds(): Observable<Breed[]> {
        return this.http.get<Breed[]>(this.baseUrl + 'products/types');
    }
}