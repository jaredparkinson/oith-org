import { Component, OnInit, Input } from '@angular/core';

import { RefService } from 'src/app/services/ref.service';
import { SecondaryNote, NoteRef } from '../../../../../oith.shared';

@Component({
  selector: 'app-secondary-note',
  template: `
    <secondary-note *ngIf="this.setVisibility()">
      <app-note-phrase
        *ngIf="this.secondaryNote.notePhrase"
        [notePhrase]="secondaryNote.notePhrase"
      ></app-note-phrase>
      <app-note-ref
        *ngFor="let noteRef of noteRefs"
        [noteRef]="noteRef"
      ></app-note-ref>
    </secondary-note>
  `,
  styles: [
    `
      secondary-note {
        display: grid;
        grid-gap: 5px;
      }
    `,
  ],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNote;
  public noteRefs: NoteRef[];
  public constructor(public refService: RefService) {}

  public ngOnInit() {}

  public setVisibility(): boolean {
    this.noteRefs = this.secondaryNote.noteRefs.filter(
      (noteRef): boolean => {
        return this.refService.refs.get(noteRef._id) === true;
      },
    );

    // console.log(this.refService.refs);

    return this.noteRefs.length > 0;
  }
}
