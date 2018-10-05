import { LaBouffeApi, InternalLaBouffeApi } from './api';
import { Observable } from 'rxjs';

export interface FoodPlace {
    name: string;
}

LaBouffeApi.prototype.addFoodPlace = function (this: InternalLaBouffeApi, foodPlace: FoodPlace) {
    return new Observable<void>((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        if (findFoodPlaceIndex(newFoodPlaces, foodPlace) > -1) {
            observer.error(`FoodPlace ${foodPlace.name} already added`);
            return;
        }
        newFoodPlaces.push(foodPlace);
        this.database.foodPlaces.next(newFoodPlaces);
        observer.next(undefined);
    });
};

LaBouffeApi.prototype.getFoodPlaces = function (this: InternalLaBouffeApi): Observable<FoodPlace[]> {
    return this.database.foodPlaces.asObservable();
};

LaBouffeApi.prototype.removeFoodPlace = function (this: InternalLaBouffeApi, foodPlace: FoodPlace): Observable<void> {
    return new Observable((observer) => {
        const newFoodPlaces = [...this.database.foodPlaces.getValue()];
        const foodPlaceIndex = findFoodPlaceIndex(newFoodPlaces, foodPlace);
        if (foodPlaceIndex < 0) {
            observer.error(`FoodPlace ${foodPlace.name} doesn't exist`);
            return;
        }
        newFoodPlaces.splice(foodPlaceIndex, 1);
        this.database.foodPlaces.next(newFoodPlaces);
        observer.next(undefined);
    });
};

export const getId = (foodPlace: FoodPlace): string => {
    return foodPlace.name;
}

export const findFoodPlaceIndex = (foodPlaces: FoodPlace[], foodPlace: FoodPlace) => {
    return foodPlaces.findIndex((item) => {
        return item.name === getId(foodPlace);
    });
};

declare module './api' {
    interface LaBouffeApi {
        getFoodPlaces(): Observable<FoodPlace[]>;
        addFoodPlace(foodPlace: FoodPlace): Observable<void>;
        removeFoodPlace(foodPlace: FoodPlace): Observable<void>;
    }
}
