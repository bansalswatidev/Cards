import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRefService {

  constructor() { }

  get localStorage(): Storage {
    return localStorage;
  }

}
