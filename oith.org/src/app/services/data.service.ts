import { Injectable } from '@angular/core';
import axios from 'axios';
import * as PouchDB from 'pouchdb';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public constructor() {
    console.log(window.location);
  }
  // public db = new PouchDB(`${window.location.hostname}-oith-org-v5`);

  public validateUrl(url: string): boolean {
    return false;
  }

  public async queryChapterData<T>(id: string): Promise<T> {
    // try {
    //   const data = await this.db.get(id);
    //   return (data as unknown) as T;
    // } catch {}
    try {
      const data = await axios.get(`assets/scriptures/${id}`);
      return data.data as T;
    } catch (error) {
      throw error;
    }
  }
}
