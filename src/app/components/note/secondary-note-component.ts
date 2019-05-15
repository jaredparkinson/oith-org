import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'oith.notes/src/models/Note';
import { SecondaryNote } from 'oith.notes/src/models/SecondaryNote';

@Component({
  selector: 'app-secondary-note',
  template: `
    <secondary-note>
      <app-note-phrase
        *ngIf="this.secondaryNote.notePhrase"
        [notePhrase]="secondaryNote.notePhrase"
      ></app-note-phrase>
    </secondary-note>
  `,
  styles: [''],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNote;
  public constructor() {}

  public ngOnInit() {}
}
