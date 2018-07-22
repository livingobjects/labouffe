import { finalize, first, switchMap } from 'rxjs/operators';
import { LaBouffeApi } from '.';

describe('Votes', () => {

    it('should upvote', (done) => {
        const api = new LaBouffeApi({ foodPlaces: [{ name: 'MacDo', votes: [] }] });

        api.upVote({ name: 'MacDo', votes: [] }, 'johndoe').pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first())),
            finalize(() => done())
        ).subscribe((foodPlaces) => {
            expect(foodPlaces[0].votes).toEqual(['johndoe']);
        }, () => {
            fail();
        });
    });
});
