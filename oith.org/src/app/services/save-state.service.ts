import { Injectable } from '@angular/core';
import {
  SaveStateModel,
  RefLabelSetting,
  refLabelSettingsTemplate,
} from './SaveStateModel';
// import * as cg from './categories.json';
@Injectable({
  providedIn: 'root',
})
export class SaveStateService {
  public constructor() {}

  public data: SaveStateModel = new SaveStateModel();

  public async load(): Promise<void> {
    const tempData = localStorage.getItem('oithSettings');

    if (tempData) {
      this.data = JSON.parse(tempData) as SaveStateModel;

      if (this.data.underLineRefs === undefined) {
        this.data.underLineRefs = true;
      }
    } else {
      this.data = new SaveStateModel();
    }

    // cg.
    console.log(refLabelSettingsTemplate);

    (refLabelSettingsTemplate as RefLabelSetting[]).map(
      (c): void => {
        if (
          !this.data.refLabelSettings.find(
            (r): boolean => {
              return r.refLabelName === c.refLabelName;
            },
          )
        ) {
          this.data.refLabelSettings.push(c);
        }
      },
    );
    await this.save();
  }
  public async save(): Promise<void> {
    localStorage.setItem('oithSettings', JSON.stringify(this.data));
  }
}
