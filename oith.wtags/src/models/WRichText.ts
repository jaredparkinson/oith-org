import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
import { RichText } from '../enums/RichText';
export class WRichText extends W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.RichText;
  public text: string | undefined;
  public richText: RichText;
}
