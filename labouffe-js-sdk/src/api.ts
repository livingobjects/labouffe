import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { FoodPlace } from './food-place';

export interface Database {
    foodPlaces: BehaviorSubject<FoodPlace[]>;
}

export interface InternalLaBouffeApi {
    database: Database;
}

export class LaBouffeApi {
    private database: Database;

    constructor(initialState?: { foodPlaces: FoodPlace[] }) {
        this.database = {
            foodPlaces: new BehaviorSubject<FoodPlace[]>(initialState && initialState.foodPlaces || [])
        };
    }
}
