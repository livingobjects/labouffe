import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { FoodPlace } from './food-place';
import { Vote } from './votes';

export interface Database {
    foodPlaces: BehaviorSubject<FoodPlace[]>;
    votes: BehaviorSubject<Vote[]>;
}

export interface InternalLaBouffeApi {
    database: Database;
}

export class LaBouffeApi {
    private database: Database;

    constructor(foodPlaces: FoodPlace[] = [], votes: Vote[] = []) {
        this.database = {
            foodPlaces: new BehaviorSubject<FoodPlace[]>(foodPlaces),
            votes: new BehaviorSubject<Vote[]>(votes)
        };
    }
}
