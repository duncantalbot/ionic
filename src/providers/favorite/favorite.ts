import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { DishProvider } from '../dish/dish';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE_KEY = 'favoriteDishes';

@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http, private dishservice: DishProvider, private storage: Storage, private localNotifications: LocalNotifications) {
    storage.get('favoriteDishes').then(data => {
      if (data) {
        this.favorites = data;
      }
      else
        console.log('favourite dishes not defined');
    });
    console.log('Hello FavoriteProvider Provider');

    // Schedule a single notification
  }


  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
    {
      this.favorites.push(id);
      this.storage.set(STORAGE_KEY, this.favorites);

      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      });

      return true;
    }
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set(STORAGE_KEY, this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
}
