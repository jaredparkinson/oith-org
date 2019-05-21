import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'oith.notes/src/models/Note';
import { SecondaryNote } from 'oith.notes/src/models/SecondaryNote';
import { NotePhrase } from 'oith.notes/src/models/NotePhrase';

@Component({
  selector: 'app-note-phrase',
  template: `
    <note-phrase>{{ this.notePhrase.text }}</note-phrase>
  `,
  styles: [
    `
      note-phrase {
        margin-top: 0;
        margin-right: 0;
        margin-left: 0;
        padding-left: 4pt;
      }
    `,
  ],
})
export class NotePhraseComponent implements OnInit {
  @Input() public notePhrase: NotePhrase;
  constructor() {}

  ngOnInit() {}
}
