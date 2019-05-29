import { Component, OnInit, Input } from '@angular/core';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';
import { NoteLDSSource } from '../../../../../oith.notes/src/models/Note';
import { parseOffset } from 'src/app/services/parseOffset';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public verse: LDSSourceVerse;
  public constructor() {}

  public ngOnInit(): void {
    // console.log(this.verse.formatTags);
  }

  public getNote(): NoteLDSSource {
    if (this.verse.note && this.verse.note.secondaryNotes) {
      this.verse.note.secondaryNotes.map(
        (secondaryNote): void => {
          secondaryNote.uncompressedOffsets = parseOffset(
            secondaryNote.offsets,
          );
          if (secondaryNote.uncompressedOffsets) {
            console.log(secondaryNote.uncompressedOffsets);
          }
        },
      );
    }

    return this.verse.note;
  }
}
