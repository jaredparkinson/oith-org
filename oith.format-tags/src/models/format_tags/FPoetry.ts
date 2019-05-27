import { Poetry } from '../../enums/Poetry';
import { F } from './F';
import { FType } from '../../enums/FType';
export class WPoetry extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType;
  public text: string | undefined;
  public poetry: Poetry;
}
