import { Color } from '../enums/Color';
import { F } from './F';
import { FType } from '../enums/FType';
export class WHighlight extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType = FType.Highlight;
  public text: string | undefined;
  public color: Color;
}
