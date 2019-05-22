import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { flatten } from 'lodash';
import { SaveStateService } from './save-state.service';
import { Note, NoteTypeEnum } from '../../../../oith.shared';

@Injectable({
  providedIn: 'root',
})
export class RefService {
  public refs: Map<string, boolean> = new Map<string, boolean>();
  public constructor(private saveState: SaveStateService) {}
  public initRefVisibility(notes: Note[]): void {
    flatten(
      notes.map(
        (note): void => {
          if (note.secondaryNotes) {
            note.secondaryNotes.map(
              (secondaryNote): void => {
                secondaryNote.noteRefs.map(
                  (noteRef): void => {
                    switch (noteRef.type) {
                      case NoteTypeEnum.Eng: {
                        this.refs.set(
                          noteRef._id,
                          this.saveState.data.englishNotesVisible,
                        );
                        break;
                      }
                      case NoteTypeEnum.New: {
                        this.refs.set(
                          noteRef._id,
                          this.saveState.data.newNotesVisible,
                        );
                        break;
                      }
                      case NoteTypeEnum.TC: {
                        this.refs.set(
                          noteRef._id,
                          this.saveState.data.translatorNotesVisible,
                        );
                        break;
                      }
                    }
                  },
                );
              },
            );
          }
        },
      ),
    );
  }
}
