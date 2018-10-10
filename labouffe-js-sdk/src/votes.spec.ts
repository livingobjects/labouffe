import { finalize, first, switchMap, take, mapTo, map } from 'rxjs/operators';
import { LaBouffeApi } from '.';
import { FoodPlace, getId } from './food-place';

describe('Votes', () => {

    it('should get votes', (done) => {
        const vote = { username: 'johndoe', foodPlaceId: 'MacDo' };
        const api = new LaBouffeApi(
            [{ name: 'MacDo' }],
            [vote]
        );

        api.getVotes().pipe(
            first()
        ).subscribe((votes) => {
            expect(votes.length).toEqual(1);
            expect(votes[0]).toEqual(vote);
            done();
        }, () => {
            fail();
        });
    });

    it('should upvote', (done) => {
        const foodPlace = { name: 'MacDo' };
        const api = new LaBouffeApi([foodPlace]);

        api.toggleVote('johndoe', foodPlace).pipe(
            first(),
            switchMap(() => api.getVotes().pipe(first()))
        ).subscribe((votes) => {
            expect(votes[0].username).toEqual('johndoe');
            expect(votes[0].foodPlaceId).toEqual(getId(foodPlace));
            done();
        }, () => {
            fail();
        });
    });

    it('should unvote', (done) => {
        const foodPlace = { name: 'MacDo' };
        const api = new LaBouffeApi(
            [foodPlace],
            [{ username: 'johndoe', foodPlaceId: 'MacDo' }]
        );

        api.toggleVote('johndoe', foodPlace).pipe(
            first(),
            switchMap(() => api.getVotes().pipe(first()))
        ).subscribe((votes) => {
            expect(votes.length).toEqual(0);
            done();
        }, () => {
            fail();
        });
    });

    it('should add two votes', (done) => {
        const foodPlace = { name: 'MacDo' };
        const api = new LaBouffeApi(
            [foodPlace]
        );
        api.toggleVote('johndoe', foodPlace).pipe(
            switchMap(() => api.toggleVote('jeanmich', foodPlace)),
            switchMap(() => api.getVotes().pipe(first()))
        ).subscribe((votes) => {
            const vote1 = votes.find((vote) => vote.username === 'johndoe');
            const vote2 = votes.find((vote) => vote.username === 'jeanmich');
            expect(vote1).toBeTruthy();
            expect(vote2).toBeTruthy();
            expect(votes[0].foodPlaceId).toEqual(getId(foodPlace));
            expect(votes[1].foodPlaceId).toEqual(getId(foodPlace));
            done();
        }, () => {
            fail();
        });
    });
});
