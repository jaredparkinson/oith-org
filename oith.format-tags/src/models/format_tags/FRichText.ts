import { RichText } from '../../enums/RichText';
import { F } from './F';
import { FType } from '../../enums/FType';
export class FormatRichText extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType = FType.RichText;
  public text: string | undefined;
  public richText: RichText;
}
