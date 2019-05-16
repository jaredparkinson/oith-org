import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
export class WUnderline implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Underline;
  public text: string | undefined;
}
