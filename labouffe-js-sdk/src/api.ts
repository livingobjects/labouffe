import {BehaviorSubject, Observable} from 'rxjs';

export interface FoodPlace {
    name: string;
}

export class LaBouffe {
    public foodPlaces = new BehaviorSubject<FoodPlace[]>([]);

    public findFoodPlaces(): Observable<FoodPlace[]> {
        return this.foodPlaces;
    }

    public addFoodPlace(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        if (!lastState.find((item) => {
            return item.name === foodPlace.name;
        })) {
            lastState.push(foodPlace);
        }
        this.foodPlaces.next(lastState);
    }

    public updateFoodPlaces(foodPlaces: FoodPlace[]) {
        this.foodPlaces.next(foodPlaces);
    }

    public deleteFoodPlace(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        const newState = lastState.filter((item) => {
            return item.name !== foodPlace.name;
        });
        this.foodPlaces.next(newState);
    }
}
