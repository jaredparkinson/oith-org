import { Component, OnInit, Input } from '@angular/core';
import { NotePhrase } from '../../../../../oith.shared';

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
