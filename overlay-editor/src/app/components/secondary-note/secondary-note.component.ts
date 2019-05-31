import { Component, OnInit, Input } from '@angular/core';
import {
  SecondaryNoteLDSSource,
  NoteRegLds,
} from '../../../../../oith.notes/src/models/Note';
import { DataService } from 'src/app/services/data.service';

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
    this.dataService.editMode = !this.dataService.editMode;
    // if (this.dataService.editMode) {
    //   setTimeout(() => {
    //     try {
    //       tinymce.init({
    //         selector: '.note-phrase',
    //         inline: true,
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }, 5000);
    // }
    // this.editMode !== this.editMode;
  }
  /**
   * addOffsets
   */
  public addOffsets(): void {
    const g = window.getSelection();
    if (g) {
      const g7 = g.getRangeAt(0);
      const s = this.parseRange(g7.startContainer);
      const e = this.parseRange(g7.endContainer);
      if (s && e) {
        console.log(s);
        console.log(g7.startOffset);
        console.log(e);
        console.log(g7.endOffset);
        console.log(this.secondaryNote.offsets);
        s[1] = g7.startOffset === 0 ? s[1] : s[1] + g7.startOffset - 1;
        e[1] = g7.endOffset === 0 ? e[1] : e[1] + g7.endOffset - 1;
        this.secondaryNote.offsets = `${this.secondaryNote.offsets},${s[1]}-${
          e[1]
        }`;
      }
    }
  }
  public parseRange(
    startContainer: Node,
  ): [string, number, number] | undefined {
    try {
      const container =
        startContainer.nodeName === '#text'
          ? startContainer.parentElement
          : startContainer;
      const vId = (container as Element).getAttribute('verseid');
      const offsets = (container as Element).getAttribute('offsets');
      if (vId && offsets) {
        const split = offsets.split(',');
        return [vId, parseInt(split[0]), parseInt(split[1])];
      }
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
  /**
   * updateNotePhrase
   */
  public updateSecondaryNote(event: Event, property: string): void {
    this.dataService.editNotes();
    this.secondaryNote[property] = ((event as KeyboardEvent)
      .target as any).value;
  }
  public updateNoteRef(event: Event, noteRef: NoteRegLds): void {
    this.dataService.editNotes();
    noteRef.noteRef = ((event as KeyboardEvent).target as any).value;
  }

  public constructor(public dataService: DataService) {}

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
