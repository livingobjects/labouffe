import { Observable } from 'rxjs';
import { InternalLaBouffeApi, LaBouffeApi } from './api';
import { findFoodPlaceIndex, getId, FoodPlace } from './food-place';

export interface Vote {
    username: string;
    foodPlaceId: string;
}

LaBouffeApi.prototype.getVotes = function (this: InternalLaBouffeApi): Observable<Vote[]> {
    return this.database.votes.asObservable();
};

LaBouffeApi.prototype.vote = function (this: InternalLaBouffeApi, username: string, foodPlace: FoodPlace) {
    return new Observable<void>((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        const foodPlaceIndex = findFoodPlaceIndex(newFoodPlaces, foodPlace);

        if (foodPlaceIndex < 0) {
            observer.error(`FoodPlace ${foodPlace.name} doesn't exist`);
            return;
        }

        const foodPlaceId = getId(foodPlace);

        const votes = [...this.database.votes.getValue(), { username, foodPlaceId }];

        this.database.votes.next(votes);
        observer.next(undefined);
        observer.complete();
    });
};

LaBouffeApi.prototype.unVote = function (this: InternalLaBouffeApi, username: string, foodPlace: FoodPlace) {
    return new Observable<void>((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        const foodPlaceIndex = findFoodPlaceIndex(newFoodPlaces, foodPlace);

        if (foodPlaceIndex < 0) {
            observer.error(`FoodPlace ${foodPlace.name} doesn't exist`);
            return;
        }

        const foodPlaceId = getId(foodPlace);

        const votes = [...this.database.votes.getValue()].filter((vote) =>
            vote.username !== username && vote.foodPlaceId !== foodPlaceId
        );
        this.database.votes.next(votes);
        observer.next(undefined);
        observer.complete();
    });
};

declare module './api' {
    interface LaBouffeApi {
        vote(username: string, foodPlace: FoodPlace): Observable<void>;
        unVote(username: string, foodPlace: FoodPlace): Observable<void>;
        getVotes(): Observable<Vote[]>;
    }
}