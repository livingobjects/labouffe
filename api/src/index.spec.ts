import { Observable } from 'rxjs';

import { take, skip } from 'rxjs/operators';

import { LaBouffe, FoodPlace } from './api';



describe('labouffe', () => {

  let api: LaBouffe;



  beforeEach(() => {

    api = new LaBouffe();

  })



  it('should retrieve the food places list. Which is empty at start',

    (done) => {

      api.findFoodPlaces().pipe(

        take(1)

      ).subscribe((foodPlaces) => {

        expect(foodPlaces).toEqual([]);

        done();

      })

    }

  );



  it('should add a food place', (done) => {

    const foodPlace: FoodPlace = { name: 'MacDo' };

    

    api.findFoodPlaces().pipe(

      skip(1),

      take(1)

    ).subscribe((foodPlaces) => {

      expect(foodPlaces).toEqual([foodPlace]);

      done();

    });



    api.addFoodPlace(foodPlace);

  });



  it('should update the food places list', (done) => {

    const foodPlace: FoodPlace = { name: 'MacDo' };

    const newFoodPlaces : FoodPlace[] = [{name: 'KFC'}, {name: 'Subway'}];



    api.findFoodPlaces().pipe(

      skip(2),

      take(1)

    ).subscribe((foodPlaces) => {

      expect(foodPlaces).toEqual(newFoodPlaces);

      done();

    });



    api.addFoodPlace(foodPlace);

    api.updateFoodPlaces(newFoodPlaces);

  });



  it('should delete one foodplace', (done) => {

    const foodPlace: FoodPlace = { name: 'MacDo' };

    const foodPlace2: FoodPlace = { name: 'Subway' };



    api.findFoodPlaces().pipe(

      skip(3),

      take(1)

    ).subscribe((foodPlaces) => {

      expect(foodPlaces).toEqual([foodPlace2]);

      done();

    });



    api.addFoodPlace(foodPlace);

    api.addFoodPlace(foodPlace2);

    api.deleteFoodPlace(foodPlace);

  });



  it('should not add a foodPlace twice', (done) => {

    const foodPlace: FoodPlace = { name: 'MacDo' };



    api.findFoodPlaces().pipe(

      skip(2),

      take(1)

    ).subscribe((foodPlaces) => {

      expect(foodPlaces).toEqual([foodPlace]);

      done();

    });



    api.addFoodPlace(foodPlace);

    api.addFoodPlace(foodPlace);

  });

});


