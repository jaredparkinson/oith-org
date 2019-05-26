import { Poetry } from '../enums/Poetry';
import { F } from './F';
import { FType } from '../enums/FType';
export class WPoetry extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType;
  public text: string | undefined;
  public poetry: Poetry;
}
