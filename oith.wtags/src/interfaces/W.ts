import { WType } from '../enums/WType';

export abstract class W {
  public charCount: [number, number][];
  public charCountUncompressed: number[];
  public optional: boolean | undefined;
  public wType: WType;
  public text: string | undefined;
  public verseID: string;
  public visible: boolean | undefined;
}
