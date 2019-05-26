import { FType } from '../../enums/FType';
import { F } from './F';

export class WUnderline extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType = FType.Underline;
  public text: string | undefined;
}
