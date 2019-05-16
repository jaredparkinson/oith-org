import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
export class WBase implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Base;
  public text: string;
}
