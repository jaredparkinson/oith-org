import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public constructor() {
    console.log(window.location);
  }

  public validateUrl(url: string): boolean {
    return false;
  }
}
