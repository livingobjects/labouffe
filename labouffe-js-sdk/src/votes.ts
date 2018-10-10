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

LaBouffeApi.prototype.toggleVote = function (this: InternalLaBouffeApi, username: string, foodPlace: FoodPlace) {
    return new Observable<void>((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        const foodPlaceIndex = findFoodPlaceIndex(newFoodPlaces, foodPlace);

        if (foodPlaceIndex < 0) {
            observer.error(`FoodPlace ${foodPlace.name} doesn't exist`);
            return;
        }

        const foodPlaceId = getId(foodPlace);
        const votes = [...this.database.votes.getValue()];
        const voteIndex = votes.findIndex((vote) => vote.username === username && vote.foodPlaceId === foodPlaceId);

        if (voteIndex < 0) {
            votes.push({ username, foodPlaceId });
        } else {
            votes.splice(voteIndex, 1);
        }

        this.database.votes.next(votes);
        observer.next(undefined);
        observer.complete();
    });
};

declare module './api' {
    interface LaBouffeApi {
        getVotes(): Observable<Vote[]>;
        toggleVote(username: string, foodPlace: FoodPlace): Observable<void>;
    }
}
