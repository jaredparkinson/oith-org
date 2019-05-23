import { NotePhrase } from './NotePhrase';
import { NoteRef } from './NoteRef';
export class SecondaryNote {
  public classList: string[] | undefined;
  public id: string;
  public noteMarker: string | undefined | null;
  public notePhrase: NotePhrase | undefined;
  public noteRefs: NoteRef[] = [];
  public verseMarker: string | undefined | null;
  public highlight: boolean | undefined;
}
