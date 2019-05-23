import { W } from '../interfaces/W';
import { WType } from '../enums/WType';
import { NoteType } from '../enums/NoteType';
export class WRef implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Refs;
  public text: string | undefined;
  public ref: string;
  public noteType: NoteType;
  public visible: boolean | undefined;
}
