import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
import { Color } from '../enums/Color';
export class WHighlight implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Highlight;
  public text: string | undefined;
  public color: Color;
}
