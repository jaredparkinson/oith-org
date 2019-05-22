import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith.shared';

@Component({
  selector: 'app-note-ref',
  template: `
    <note-ref
      [ngClass]="{
        'note-ref-new': this.noteRef.type === 1,
        'note-ref-english': this.noteRef.type === 2,
        'note-ref-tc': this.noteRef.type === 3
      }"
      [innerHTML]="this.noteRef.text"
    ></note-ref>
  `,
  styles: [
    `
      .note-ref-new {
      }
      .note-ref-english {
        background-color: #ffffe0;
      }
      .note-ref-tc {
        background-color: #fff;
      }
      note-ref {
        margin-top: 4pt;
        margin-right: 0;
        margin-left: 0.25in;
        display: inline-block;
        width: 80%;
      }
    `,
  ],
})
export class NoteRefComponent implements OnInit {
  @Input() public noteRef: NoteRef;
  public constructor() {
    // console.log(this.noteRef);
  }

  public ngOnInit() {}
}
