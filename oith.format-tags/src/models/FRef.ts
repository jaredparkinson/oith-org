import { NoteType } from '../enums/NoteType';
import { F } from './F';
import { FType } from '../enums/FType';
export class WRef extends F {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public FType: FType = FType.Refs;
  public text: string | undefined;
  public ref: string;
  public noteType: NoteType;
}
