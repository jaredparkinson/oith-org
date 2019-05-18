import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'oith.notes/src/models/Note';
import { SecondaryNote } from 'oith.notes/src/models/SecondaryNote';
import { NotePhrase } from 'oith.notes/src/models/NotePhrase';

@Component({
  selector: 'app-note-phrase',
  template: `
    <note-phrase>{{ this.notePhrase.text }}</note-phrase>
  `,
  styles: [''],
})
export class NotePhraseComponent implements OnInit {
  @Input() public notePhrase: NotePhrase;
  constructor() {}

  ngOnInit() {}
}
