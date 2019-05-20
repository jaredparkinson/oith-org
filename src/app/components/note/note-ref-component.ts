import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'oith.notes/src/models/Note';
import { SecondaryNote } from 'oith.notes/src/models/SecondaryNote';
import { NoteRef } from 'oith.notes/src/models/NoteRef';

@Component({
  selector: 'app-note-ref',
  template: `
    <note-ref [innerHTML]="this.noteRef.text"></note-ref>
  `,
  styles: [''],
})
export class NoteRefComponent implements OnInit {
  @Input() public noteRef: NoteRef;
  public constructor() {
    // console.log(this.noteRef);
  }

  public ngOnInit() {}
}
