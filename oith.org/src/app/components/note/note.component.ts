import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'oith.notes/src/models/Note';
import { SecondaryNote } from 'oith.notes/src/models/SecondaryNote';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() public note: Note;
  constructor() {}

  ngOnInit() {}

  public getSecondaryNotes(): SecondaryNote[] {
    return this.note.secondaryNotes ? this.note.secondaryNotes : [];
  }
}
