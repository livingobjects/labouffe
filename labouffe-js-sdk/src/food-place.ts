import { BehaviorSubject, Observable } from "rxjs";

export interface FoodPlace {
    name: string;
    votes: string[];
}

export class FoodPlaceApi {

    public foodPlaces = new BehaviorSubject<FoodPlace[]>([]);

    public list(): Observable<FoodPlace[]> {
        return this.foodPlaces;
    }

    public add(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        if (!lastState.find((item) => {
            return item.name === foodPlace.name;
        })) {
            lastState.push({...foodPlace, voteCount: foodPlace.voteCount || 0});
        }
        this.foodPlaces.next(lastState);
    }

    public update(foodPlaces: FoodPlace[]) {
        this.foodPlaces.next(foodPlaces);
    }

    public delete(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        const newState = lastState.filter((item) => {
            return item.name !== foodPlace.name;
        });
        this.foodPlaces.next(newState);
    }

    public upVote(foodPlace: FoodPlace) {
        const lastState = [...this.foodPlaces.getValue()];
        const myFoodPlace = lastState.find((item) => {
            return item.name === foodPlace.name;
        });

        if (myFoodPlace) {
            if (myFoodPlace.voteCount === undefined) {
                myFoodPlace.voteCount = 0;
            }
            myFoodPlace.voteCount++;
        }

        this.foodPlaces.next(lastState);
    }

    public downVote(foodPlaceName: string, userName: string) {
        const lastState = [...this.foodPlaces.getValue()];
        const myFoodPlace = lastState.find((item) => {
            return item.name === foodPlaceName;
        });

        const canBeDownVoted = myFoodPlace && myFoodPlace.votes 
        && myFoodPlace.votes.includes(userName);

        if (canBeDownVoted) {
            myFoodPlace.votes = myFoodPlace.votes.filter((voteName) => voteName !== userName);
        }

        this.foodPlaces.next(lastState);
    }
}
