import { Component, OnInit, Input } from '@angular/core';
import { Note, SecondaryNote } from '../../../../../oith.shared';

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
