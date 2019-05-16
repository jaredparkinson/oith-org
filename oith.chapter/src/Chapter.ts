import { Verse } from '../../oith.wtags';
import { Note } from '../../oith.notes/src';
import { W } from '../../oith.wtags/src/interfaces/W';
import { Paragraph } from './Paragraph';
export class Chapter {
  public _id: string;
  public _rev: string | undefined;
  public dataAid: string | undefined;
  public language: string;
  public nextPage: string | null;
  public notes: Note[] | undefined;
  public paragraphs: Paragraph[] | undefined;
  public previousPage: string | null;
  public shortTitle: string;
  public testament: string;
  public title: string;
  public verses: Verse[] | undefined;
  public wTagsFileID: string;
  public notesFileID: string;
  public verseIDs: string[];
  public notesIDs: string[];
  public wTags: W[] | undefined;
}
