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
    constructor(private http: HttpClient) { }

    public ages = [
        { value: "young", text: "Молодой", background: '#565050', color: 'var(--text-color)', subtitle: 'от 0 - 16 недель' },
        { value: "middle", text: "Средний", background: '#74210c', color: 'var(--text-color)', subtitle: 'от 1 до 7 лет' },
        { value: "old", text: "Пожилой", background: '#c88143', color: 'var(--dark-color)', subtitle: 'от 7 лет и старше' },
    ]

    public character = [
        { value: "calm", text: "Спокойный", background: '#565050', color: 'var(--text-color)', subtitle: '' },
        { value: "aggressive", text: "Агрессивный", background: '#74210c', color: 'var(--text-color)', subtitle: '' },
        { value: "playful", text: "Игривый", background: '#c88143', color: 'var(--dark-color)', subtitle: '' },
    ]

    public sizes = [
        { value: "small", text: "Маленький", background: '#565050', color: 'var(--text-color)', subtitle: 'до 10 кг' },
        { value: "medium", text: "Средний", background: '#74210c', color: 'var(--text-color)', subtitle: '10-25 кг' },
        { value: "large", text: "Большой", background: '#c88143', color: 'var(--dark-color)', subtitle: 'свыше 20 кг' },
    ]

    public colors = [
        { value: "black", text: "Черный", background: '#212020', color: 'var(--text-color)', subtitle: '' },
        { value: "brown", text: "Коричневый", background: '#532f17', color: 'var(--text-color)', subtitle: '' },
        { value: "beige", text: "Бежевый", background: '#bba494', color: 'var(--dark-color)', subtitle: '' },
        { value: "grey", text: "Серый", background: '#565050', color: 'var(--text-color)', subtitle: '' },
        { value: "pale-yellow", text: "Палевый", background: '#d4bc92', color: 'var(--dark-color)', subtitle: '' },
        { value: "light-red", text: "Светло-рыжий", background: '#c88143', color: 'var(--dark-color)', subtitle: '' },
        { value: "auburn", text: "Темно-рыжий", background: '#74210c', color: 'var(--text-color)', subtitle: '' },
        { value: "white", text: "Белый", background: '#ede9e3', color: 'var(--dark-color)', subtitle: '' },
    ]

    public genders = [
        { value: "male", text: "Мальчик", background: 'var(--male-color)', color: 'var(--text-color)', subtitle: '' },
        { value: "female", text: "Девочка", background: 'var(--female-color)', color: 'var(--text-color)', subtitle: '' },
    ]

    getBreeds(): Observable<Breed[]> {
        return this.http.get<Breed[]>(this.baseUrl + 'products/types');
    }
}