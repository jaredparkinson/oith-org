import { Verse, NoteRef } from '../../oith.wtags';
import { Note } from '../../oith.notes/src';
import { W } from '../../oith.wtags/src/interfaces/W';
import { Paragraph } from './Paragraph';
export class Chapter {
  public _id: string;
  public _rev: string | undefined;
  public paragraphs: Paragraph[] | undefined;
  public dataAid: string | undefined;
  public language: string;
  public notesIDs: string[] | undefined;
  public shortTitle: string;
  public testament: string;
  public title: string;
  public versesFileID: string;
  public notesFileID: string;
  public verses: Verse[] | undefined;
  public notes: Note[] | undefined;
  public wTags: W[] | undefined;
  public nextPage: string | null;
  public previousPage: string | null;
  public noteRefs: NoteRef[] = [];
}
