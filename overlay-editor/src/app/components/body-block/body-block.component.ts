import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../../../../../oith.shared';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';

@Component({
  selector: 'app-body-block',
  templateUrl: './body-block.component.html',
  styleUrls: ['./body-block.component.scss'],
})
export class BodyBlockComponent implements OnInit {
  @Input() public verses: LDSSourceVerse[];
  public constructor() {}

  public ngOnInit(): void {
    console.log(this.verses);
  }

  public addNoteTest(): void {
    if (this.verses[4].note.secondaryNotes) {
      this.verses[4].note.secondaryNotes.map(
        (sNote): void => {
          sNote.offsets = '0-10';
        },
      );
    }
  }
}
