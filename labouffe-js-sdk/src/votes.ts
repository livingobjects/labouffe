import { Observable } from 'rxjs';
import { InternalLaBouffeApi, LaBouffeApi } from './api';
import { findFoodPlaceIndex, FoodPlace } from './food-place';

LaBouffeApi.prototype.upVote = function (this: InternalLaBouffeApi, foodPlace: FoodPlace, username: string) {
    return new Observable<void>((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        const foodPlaceIndex = findFoodPlaceIndex(newFoodPlaces, foodPlace);
        if (foodPlaceIndex < 0) {
            observer.error(`FoodPlace ${foodPlace.name} doesn't exist`);
            return;
        }
        newFoodPlaces[foodPlaceIndex].votes.push(username);
        this.database.foodPlaces.next(newFoodPlaces);
        observer.next(undefined);
    });
};

declare module './api' {
    interface LaBouffeApi {
        upVote(foodPlace: FoodPlace, username: string): Observable<void>;
    }
}