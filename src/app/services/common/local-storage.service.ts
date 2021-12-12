import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/models/card';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  _data = new BehaviorSubject<Card[]>([]);
  _localStorage: Storage;
  constructor(private localStorageRef: LocalStorageRefService) { 
    this._localStorage = localStorageRef.localStorage;
  }

  getData(): any {
    let cards = JSON.parse(this._localStorage.getItem("cards") || '[]');
    this._data.next(cards);
  }

  setData(data: Card[] | null): any {
    this._localStorage.setItem("cards", JSON.stringify(data));
    this._data.next(data || []);
  }

  clearLocalStorage() {
    this._localStorage.removeItem("cards");
  }

}
