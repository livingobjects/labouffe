import { LaBouffeApi } from '.';
import { finalize, first, switchMap } from 'rxjs/operators';

describe('Foodplaces', () => {

    it('should retrieve the food places list. Which is empty at start', (done) => {
        const api = new LaBouffeApi();

        api.getFoodPlaces().pipe(
            first(),
            finalize(() => done())
        ).subscribe((foodPlaces) => {
            expect(foodPlaces).toEqual([]);
        });
    });

    it('should add a food place', (done) => {
        const api = new LaBouffeApi({ foodPlaces: [] });

        api.addFoodPlace({ name: 'MacDo', votes: [] }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first())),
            finalize(() => done())
        ).subscribe((foodPlaces) => {
            expect(foodPlaces.length).toEqual(1);
            expect(foodPlaces[0].name).toEqual('MacDo');
        }, () => {
            fail();
        });
    });

    it('should refuse to add the same food place', (done) => {
        const api = new LaBouffeApi({ foodPlaces: [{ name: 'MacDo', votes: [] }] });

        api.addFoodPlace({ name: 'MacDo', votes: [] }).pipe(
            first(),
            finalize(() => done())
        ).subscribe(() => {
            fail();
        }, () => {
            expect(true).toBe(true);
        });
    });

    it('should remove one foodplace', (done) => {
        const api = new LaBouffeApi({
            foodPlaces: [
                { name: 'MacDo', votes: [] },
                { name: 'Subway', votes: [] }
            ]
        });

        api.removeFoodPlace({ name: 'MacDo', votes: [] }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first())),
            finalize(() => done())
        ).subscribe((foodPlaces) => {
            expect(foodPlaces.length).toEqual(1);
            expect(foodPlaces[0].name).toEqual('Subway');
        }, () => {
            fail();
        });
    });

    it('should refuse to remove a non existent foodplace', (done) => {
        const api = new LaBouffeApi({
            foodPlaces: [
                { name: 'Subway', votes: [] }
            ]
        });

        api.removeFoodPlace({ name: 'MacDo', votes: [] }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first())),
            finalize(() => done())
        ).subscribe((foodPlaces) => {
            fail();
        }, () => {
            expect(true).toBe(true);
        });
    });
});
