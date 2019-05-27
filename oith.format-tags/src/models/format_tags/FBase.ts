import { FType } from '../../enums/FType';
import { F } from './F';

export class FormatBase extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType = FType.Base;
  public text: string;
}
