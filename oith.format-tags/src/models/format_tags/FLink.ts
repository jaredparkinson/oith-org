import { F } from './F';

import { FType } from '../../enums/FType';

export class WLink extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType = FType.Link;
  public text: string | undefined;
}
