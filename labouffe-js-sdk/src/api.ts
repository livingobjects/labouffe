import {BehaviorSubject, Observable} from 'rxjs';

export interface FoodPlace {
    name: string;
}

export class LaBouffe {
    foodPlaces = new BehaviorSubject<FoodPlace[]>([]);

    findFoodPlaces(): Observable<FoodPlace[]> {
        return this.foodPlaces;
    }

    addFoodPlace(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        if (!lastState.find((item) => {
            return item.name === foodPlace.name;
        })) {
            lastState.push(foodPlace);
        }
        this.foodPlaces.next(lastState);
    }

    updateFoodPlaces(foodPlaces: FoodPlace[]) {
        this.foodPlaces.next(foodPlaces);
    }

    deleteFoodPlace(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        const newState = lastState.filter((item) => {
            return item.name !== foodPlace.name;
        });
        this.foodPlaces.next(newState);
    }
}
