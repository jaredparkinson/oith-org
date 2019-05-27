import { FType } from '../../enums/FType';
import { F } from './F';

export class WUnderline extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType = FType.Underline;
  public text: string | undefined;
}
