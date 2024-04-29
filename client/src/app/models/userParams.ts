import { User } from "./user.model";

export class UserParams {   
    gender: string;
    minAge!: 18;
    maxAge!: 99;
    pageNumber: number;
    pageSize: number;

    constructor(user: User) {
        this.gender = user.gender === 'female'? 'male' : 'female';
        this.pageNumber = 1;
        this.pageSize = 5;
    }
}