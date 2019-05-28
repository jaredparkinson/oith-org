import { Component, OnInit, Input } from '@angular/core';
import { NotePhrase, NoteRef } from '../../../../../oith.shared';
import { SecondaryNoteLDSSource } from '../../../../../oith.notes/src/models/Note';

@Component({
  selector: 'app-secondary-note',
  templateUrl: './secondary-note.component.html',
  styleUrls: ['./secondary-note.component.scss'],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNoteLDSSource;
  public constructor() {}

  public ngOnInit() {}

  public getClassList(): string {
    return '';
  }
  public getOffSets(): string {
    return '';
  }
  public getNotePhrase(): NotePhrase {
    return new NotePhrase();
  }

  public getNoteRefs(): NoteRef[] {
    return [];
  }
}
