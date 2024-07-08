import { User } from "./user.model";

export class UserParams {   
    gender: string;
    minAge: number;
    maxAge: number;
    pageNumber: number;
    pageSize: number;
    city: string;

    constructor(user: User) {
        this.gender = user.gender;
        this.pageNumber = 1;
        this.pageSize = 5;
        this.minAge = 1;
        this.maxAge = 15;
        this.city = 'Москва';
    }
}