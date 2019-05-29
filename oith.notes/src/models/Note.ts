import { SecondaryNote } from './SecondaryNote';

export class Note {
  public _id: string | undefined;
  public _rev: string | undefined;
  public noteShortTitle: string;
  public noteTitle: string;
  public secondaryNotes: SecondaryNote[] | undefined;
}

export class NoteLDSSource {
  public chaterDataAid: string;
  public _id: string | undefined;
  public _rev: string | undefined;
  public noteShortTitle: string;
  public noteTitle: string;
  public secondaryNotes: SecondaryNoteLDSSource[] | undefined;
}

export class SecondaryNoteLDSSource {
  public classList: string[] | undefined;
  public id: string;
  public notePhrase: string | undefined;
  public noteRefs: string[] = [];
  public offsets: string;
  public uncompressedOffsets: number[] | undefined;
}
