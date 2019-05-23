// import * as he from 'he';
import { NoteType } from './NoteType';
import { ReferenceLabel } from './ReferenceLabel';
export class NoteRef {
  public _id: string;
  // tslint:disable-next-line:variable-name
  public _rev: string | undefined;
  public classList: string[] | undefined;
  public referenceLabel: ReferenceLabel | undefined;

  public text: string;
  public type: NoteType | undefined;
  public visible: boolean | undefined;
}
