import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { FoodPlace, FoodPlaceApi, list } from './food-place';

export interface State {
    foodPlaces: BehaviorSubject<FoodPlace[]>;
}

export class LaBouffeApi {

    private state: State;

    constructor(initialState?: { foodPlaces: FoodPlace[] }) {
        this.state = {
            foodPlaces: new BehaviorSubject<FoodPlace[]>(initialState && initialState.foodPlaces || [])
        };
    }

    public foodPlaces(): Observable<FoodPlace[]> {
        return this.state.foodPlaces.asObservable();
    }

    public addFoodPlace(foodPlace: FoodPlace): Observable<void> {
        return Observable.create(() => {
            const newFoodPlaces = [...this.state.foodPlaces.getValue()];

            if (this.foodPlaceExists(newFoodPlaces, foodPlace)) {
                return throwError(`FoodPlace ${foodPlace.name} already added`);
            }

            newFoodPlaces.push(foodPlace);
            this.state.foodPlaces.next(newFoodPlaces);
        });
    }

    private foodPlaceExists(foodPlaces: FoodPlace[], foodPlace: FoodPlace): boolean {
        return !!foodPlaces.find((item) => {
            return item.name === foodPlace.name;
        });
    }

    public removeFoodPlace(foodPlace: FoodPlace): Observable<void> {
        const subject = new Subject<void>();
        subject.next();
        return subject;
    }

}
