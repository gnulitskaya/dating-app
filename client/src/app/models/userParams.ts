import { User } from "./user.model";

export class UserParams {   
    gender: string;
    minAge: number;
    maxAge: number;
    pageNumber: number;
    pageSize: number;

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
        this.pageNumber = 1;
        this.pageSize = 5;
        this.minAge = 18;
        this.maxAge = 99;
    }
}