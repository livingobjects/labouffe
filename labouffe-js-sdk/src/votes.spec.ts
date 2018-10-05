import { finalize, first, switchMap, take, mapTo, map } from 'rxjs/operators';
import { LaBouffeApi } from '.';
import { FoodPlace, getId } from './food-place';

describe('Votes', () => {

    it('should get votes', (done) => {
        const api = new LaBouffeApi(
            [{ name: 'MacDo' }],
            [{ username: 'johndoe', foodPlaceId: 'MacDo' }]
        );

        api.getVotes().pipe(
            first())
            .subscribe((votes) => {
                expect(votes.length).toEqual(1);
                expect(votes[0]).toEqual({ username: 'johndoe', foodPlaceId: 'MacDo' });
                done();
            }, () => {
                fail();
            });
    });

    it('should upvote', (done) => {
        const api = new LaBouffeApi([{ name: 'MacDo' }]);

        let myFoodPlace: FoodPlace | null = null;

        api.getFoodPlaces().pipe(
            first(),
            switchMap((foodPlaces) => {
                myFoodPlace = foodPlaces[0];
                return api.vote('johndoe', foodPlaces[0]);
            }),
            switchMap(() => api.getVotes().pipe(first()))
        ).subscribe((votes) => {
            expect(votes[0].username).toEqual('johndoe');
            expect(votes[0].foodPlaceId).toEqual(getId(myFoodPlace!));
            done();
        }, () => {
            fail();
        });
    });

    it('should unvote', (done) => {
        const api = new LaBouffeApi(
            [{ name: 'MacDo' }],
            [{ username: 'johndoe', foodPlaceId: 'MacDo' }]
        );

        api.getFoodPlaces().pipe(
            first(),
            switchMap((foodPlaces) => {
                return api.unVote('johndoe', { name: 'MacDo' });
            }),
            switchMap(() => api.getVotes().pipe(first()))
        ).subscribe((votes) => {
            expect(votes.length).toEqual(0);
            done();
        }, () => {
            fail();
        });
    });

    it('should add two votes', (done) => {
        const api = new LaBouffeApi(
            [{ name: 'MacDo' }]
        );
        api.getFoodPlaces().pipe(
            first(),
            switchMap((foodPlaces) =>
                api.vote('johndoe', foodPlaces[0]).pipe(mapTo(foodPlaces[0]))
            ),
            switchMap((myFoodPlace) => api.vote('jeanmich', myFoodPlace!).pipe(mapTo(myFoodPlace))),
            switchMap((myFoodPlace) => api.getVotes().pipe(
                first(),
                map((votes) => ({ votes, myFoodPlace }))
            ))
        ).subscribe(({ votes, myFoodPlace }) => {
            expect(votes.find((vote) => vote.username === 'johndoe')!.username).toEqual('johndoe');
            expect(votes.find((vote) => vote.username === 'jeanmich')!.username).toEqual('jeanmich');
            expect(votes[0].foodPlaceId).toEqual(getId(myFoodPlace));
            expect(votes[1].foodPlaceId).toEqual(getId(myFoodPlace));
            done();
        }, () => {
            fail();
        });
    });
});