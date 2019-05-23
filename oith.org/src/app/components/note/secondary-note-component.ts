import { Component, OnInit, Input } from '@angular/core';

import { RefService } from 'src/app/services/ref.service';
import { SecondaryNote, NoteRef } from '../../../../../oith.shared';

@Component({
  selector: 'app-secondary-note',
  template: `
    <secondary-note
      [id]="this.secondaryNote.id"
      *ngIf="this.setVisibility()"
      [ngClass]="{ highlight: this.secondaryNote.highlight }"
    >
      <app-note-phrase
        *ngIf="this.secondaryNote.notePhrase"
        [notePhrase]="secondaryNote.notePhrase"
      ></app-note-phrase>
      <ng-container *ngFor="let noteRef of this.secondaryNote.noteRefs">
        <app-note-ref
          *ngIf="noteRef.visible"
          [noteRef]="noteRef"
        ></app-note-ref>
      </ng-container>
    </secondary-note>
  `,
  styleUrls: ['./secondary-note-component.scss'],
})
export class SecondaryNoteComponent implements OnInit {
  @Input() public secondaryNote: SecondaryNote;
  public noteRefs: NoteRef[];
  public constructor(public refService: RefService) {}

  public ngOnInit() {}

  public setVisibility(): boolean {
    // this.noteRefs = this.secondaryNote.noteRefs.filter(
    //   (noteRef): boolean => {
    //     return this.refService.refs.get(noteRef._id) === true;
    //   },
    // );

    // console.log(this.refService.refs);
    return (
      this.secondaryNote.noteRefs &&
      this.secondaryNote.noteRefs.filter(
        (noteRef): boolean => {
          return noteRef.visible === true;
        },
      ).length > 0
    );
    return true; // this.noteRefs.length > 0;
  }
}
