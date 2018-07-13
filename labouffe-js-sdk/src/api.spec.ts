import { skip, take, first, switchMap } from 'rxjs/operators';
import { LaBouffeApi } from './api';
import { FoodPlace } from './food-place';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

describe('labouffe', () => {

    it('should retrieve the food places list. Which is empty at start', (done) => {
        const api = new LaBouffeApi();

        api.foodPlaces()
            .subscribe((foodPlaces) => {
                expect(foodPlaces).toEqual([]);
                done();
            });
    });

    it('should add a food place', (done) => {
        const api = new LaBouffeApi({ foodPlaces: [] });

        api.addFoodPlace({ name: 'MacDo', votes: [] }).pipe(
            switchMap(() => api.foodPlaces())
        ).subscribe((foodPlaces) => {
            console.log('Testaaaa');
            expect(foodPlaces.length).toEqual(1);
            expect(foodPlaces[0].name).toEqual('MacDo');
            done();
        }, () => {
            fail();
        });
    });

    // it('should update the food places list', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };
    //     const newFoodPlaces: FoodPlace[] = [{ name: 'KFC', votes: [] }, { name: 'Subway', votes: [] }];

    //     api.foodPlaces.list().pipe(
    //         skip(2),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces.map((fp) => fp.name)).toEqual(newFoodPlaces.map((fp) => fp.name));
    //         done();
    //     });

    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.update(newFoodPlaces);
    // });

    // it('should delete one foodplace', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };
    //     const foodPlace2: FoodPlace = { name: 'Subway', votes: [] };

    //     api.foodPlaces.list().pipe(
    //         skip(3),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces.map((fp) => fp.name)).toEqual([foodPlace2.name]);
    //         done();
    //     });

    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.add(foodPlace2);
    //     api.foodPlaces.delete(foodPlace);
    // });

    // it('should not add a foodPlace twice', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };

    //     api.foodPlaces.list().pipe(
    //         skip(2),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces.map((fp) => fp.name)).toEqual([foodPlace.name]);
    //         done();
    //     });

    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.add(foodPlace);
    // });

    // it('a new food place has an empty vote', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };

    //     api.foodPlaces.list().pipe(
    //         skip(1),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces[0].votes.length).toEqual(0);
    //         done();
    //     });
    //     // Plouf
    //     api.foodPlaces.add(foodPlace);
    // });

    // it('should upvote', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };

    //     api.foodPlaces.list().pipe(
    //         skip(2),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces[0].votes.length).toEqual(1);
    //         done();
    //     });
    //     // Plouf
    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.upVote(foodPlace);
    // });

    // it('should downvote', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: ['johndoe', 'niksagrandmere'] };

    //     api.foodPlaces.list().pipe(
    //         skip(2),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces[0].votes.length).toEqual(1);
    //         done();
    //     });
    //     // Plop
    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.downVote(foodPlace.name, 'johndoe');
    // });

    // it('should not downvote if no vote', (done) => {
    //     const foodPlace: FoodPlace = { name: 'MacDo', votes: [] };

    //     api.foodPlaces.list().pipe(
    //         skip(2),
    //         take(1)
    //     ).subscribe((foodPlaces) => {
    //         expect(foodPlaces[0].votes.length).toEqual(0);
    //         done();
    //     });
    //     // Plop
    //     api.foodPlaces.add(foodPlace);
    //     api.foodPlaces.downVote(foodPlace.name, 'johndoe');
    // });

});
