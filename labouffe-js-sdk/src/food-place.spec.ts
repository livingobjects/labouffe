import { LaBouffeApi } from '.';
import { finalize, first, switchMap } from 'rxjs/operators';

describe('Foodplaces', () => {

    it('should retrieve the food places list. Which is empty at start', (done) => {
        const api = new LaBouffeApi();

        api.getFoodPlaces().pipe(
            first()
        ).subscribe((foodPlaces) => {
            expect(foodPlaces).toEqual([]);
            done();
        });
    });

    it('should add a food place', (done) => {
        const api = new LaBouffeApi();

        api.addFoodPlace({ name: 'MacDo' }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first()))
        ).subscribe((foodPlaces) => {
            expect(foodPlaces.length).toEqual(1);
            expect(foodPlaces[0].name).toEqual('MacDo');
            done();
        }, () => {
            fail();
        });
    });

    it('should refuse to add the same food place', (done) => {
        const api = new LaBouffeApi([{ name: 'MacDo' }]);

        api.addFoodPlace({ name: 'MacDo' }).pipe(
            first()
        ).subscribe(() => {
            fail();
        }, () => {
            expect(true).toBe(true);
            done();
        });
    });

    it('should remove one foodplace', (done) => {
        const api = new LaBouffeApi([
            { name: 'MacDo' },
            { name: 'Subway' }
        ]);

        api.removeFoodPlace({ name: 'MacDo' }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first()))
        ).subscribe((foodPlaces) => {
            expect(foodPlaces.length).toEqual(1);
            expect(foodPlaces[0].name).toEqual('Subway');
            done();
        }, () => {
            fail();
        });
    });

    it('should refuse to remove a non existent foodplace', (done) => {
        const api = new LaBouffeApi([
            { name: 'Subway' }
        ]);

        api.removeFoodPlace({ name: 'MacDo' }).pipe(
            first(),
            switchMap(() => api.getFoodPlaces().pipe(first()))
        ).subscribe((foodPlaces) => {
            fail();
        }, () => {
            expect(true).toBe(true);
            done();
        });
    });
});
