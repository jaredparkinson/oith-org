import { SecondaryNote } from './SecondaryNote';

export class Note {
  public _id: string | undefined;
  public _rev: string | undefined;
  public noteShortTitle: string;
  public noteTitle: string;
  public secondaryNotes: SecondaryNote[] | undefined;
}
