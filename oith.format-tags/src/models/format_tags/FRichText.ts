import { RichText } from '../../enums/RichText';
import { F } from './F';
import { FType } from '../../enums/FType';
export class WRichText extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType = FType.RichText;
  public text: string | undefined;
  public richText: RichText;
}
