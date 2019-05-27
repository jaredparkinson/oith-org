import { F } from './F';

import { FType } from '../../enums/FType';

export class WLink extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType = FType.Link;
  public text: string | undefined;
}
