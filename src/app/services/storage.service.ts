import { Injectable } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // private localStorage = document.defaultView?.localStorage;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor() { 
  }

  setData(key: string, data: any) {
    if (this.isLocalStorageAvailable) {
    localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getData(key: string ): any {
    if (this.isLocalStorageAvailable) {
    return JSON.parse(localStorage.getItem(key)!); 
    } 
  }

}
