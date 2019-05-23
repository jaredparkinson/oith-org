import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
import { Poetry } from '../enums/Poetry';
export class WPoetry extends W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType;
  public text: string | undefined;
  public poetry: Poetry;
}
