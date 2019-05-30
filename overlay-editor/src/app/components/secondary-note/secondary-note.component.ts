import { Component, OnInit, Input } from '@angular/core';
import {
  SecondaryNoteLDSSource,
  NoteRegLds,
} from '../../../../../oith.notes/src/models/Note';

@Component({
  selector: 'app-secondary-note',
  templateUrl: './secondary-note.component.html',
  styleUrls: ['./secondary-note.component.scss'],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNoteLDSSource;
  public editMode: boolean = false;

  public noteRefText: string = '';
  public offsets: string = '';
  public notePhraseText: string = '';

  public editModeClick(): void {
    this.editMode !== this.editMode;
  }

  /**
   * updateNotePhrase
   */
  public updateSecondaryNote(event: Event, property: string): void {
    this.secondaryNote[property] = ((event as KeyboardEvent)
      .target as any).value;
  }
  public updateNoteRef(event: Event, noteRef: NoteRegLds): void {
    noteRef.noteRef = ((event as KeyboardEvent).target as any).value;
  }

  public constructor() {}

  public ngOnInit(): void {}

  public getClassList(): string {
    return '';
  }
  public getOffSets(): string {
    return '';
  }
  public getNotePhrase(): string {
    return this.secondaryNote.notePhrase ? this.secondaryNote.notePhrase : '';
  }

  public getNoteRefs(): NoteRegLds[] {
    return this.secondaryNote.noteRefs ? this.secondaryNote.noteRefs : [];
  }

  public getRefLabel(refl: string): string {
    switch (refl) {
      case 'reference-label-alt': {
        return 'ALT';
      }
      case 'reference-label-bd': {
        return 'BD';
      }
      case 'reference-label-cross-ref': {
        return 'CR';
      }
      case 'reference-label-error': {
        return '';
      }
      case 'reference-label-geography': {
        return 'GEO';
      }
      case 'reference-label-gs': {
        return 'GS';
      }
      case 'reference-label-harmony': {
        return 'HMY';
      }
      case 'reference-label-hebrew': {
        return 'HEB';
      }
      case 'reference-label-history': {
        return 'HST';
      }
      case 'reference-label-ie': {
        return 'IE';
      }
      case 'reference-label-or': {
        return 'OR';
      }
      case 'reference-label-phrasing': {
        return 'PHR';
      }
      case 'reference-label-quotation': {
        return 'QUO';
      }
      case 'reference-label-tg': {
        return 'TG';
      }
      case 'reference-label-translation': {
        return 'TRN';
      }

      default:
        return '';
    }
  }
}
