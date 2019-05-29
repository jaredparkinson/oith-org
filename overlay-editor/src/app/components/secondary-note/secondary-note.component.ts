import { Component, OnInit, Input } from '@angular/core';
import { SecondaryNoteLDSSource } from '../../../../../oith.notes/src/models/Note';

@Component({
  selector: 'app-secondary-note',
  templateUrl: './secondary-note.component.html',
  styleUrls: ['./secondary-note.component.scss'],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNoteLDSSource;
  public constructor() {}

  public ngOnInit(): void {}

  public getClassList(): string {
    return '';
  }
  public getOffSets(): string {
    return '';
  }
  public getNotePhrase(): string {
    return this.secondaryNote.notePhrase ? this.secondaryNote.notePhrase : '';
  }

  public getNoteRefs(): string[] {
    return this.secondaryNote.noteRefs ? this.secondaryNote.noteRefs : [];
  }
}
