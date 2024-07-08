import { GenderColorType } from "./gender";
import { Photo } from "./photo"

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    imageData: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: GenderColorType;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
}