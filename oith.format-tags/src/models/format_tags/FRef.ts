import { NoteType } from '../../enums/NoteType';
import { F } from './F';
import { FType } from '../../enums/FType';
export class WRef extends F {
  public compressedOffsets: [number, number][];
  public verseID: string;
  public offsets: number[];
  public optional: boolean;
  public FType: FType = FType.Refs;
  public text: string | undefined;
  public ref: string;
  public noteType: NoteType;
}
