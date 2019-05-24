import { Component, OnInit, Input } from '@angular/core';
import { NotePhrase } from '../../../../../oith.shared';
import { RefService } from 'src/app/services/ref.service';

@Component({
  selector: 'app-note-phrase',
  template: `
    <note-phrase (click)="click()">{{ this.notePhrase.text }}</note-phrase>
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
  @Input() public id: string;
  public clicked = false;
  constructor(public refService: RefService) {}

  ngOnInit() {}

  public click(): void {
    this.clicked = !this.clicked;
    this.clicked
      ? this.refService.resetNoteHighlight(this.id)
      : this.refService.resetNoteHighlight('');
  }
}
