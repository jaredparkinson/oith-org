import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { flatten } from 'lodash';
import { SaveStateService } from './save-state.service';
import {
  Note,
  NoteTypeEnum,
  SecondaryNote,
  NoteRef,
} from '../../../../oith.shared';

@Injectable({
  providedIn: 'root',
})
export class RefService {
  public refs: Map<string, boolean> = new Map<string, boolean>();
  public noteRefs = new Map<string, NoteRef>();
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

  public flattenRefs(notes: Note[]): void {
    notes.map(
      (note): void => {
        if (note.secondaryNotes) {
          note.secondaryNotes.map(
            (secondaryNote): void => {
              secondaryNote.noteRefs.map(
                (noteRef): void => {
                  if (!this.noteRefs.has(noteRef._id)) {
                    this.setNoteRefVisibility(noteRef);
                    this.noteRefs.set(noteRef._id, noteRef);
                  }
                },
              );
            },
          );
        }
      },
    );
  }

  public resetNetNoteResfVisibility(): void {
    Array.from(this.noteRefs.values()).map(
      (noteRef): void => {
        this.setNoteRefVisibility(noteRef);
      },
    );
  }

  private setNoteRefVisibility(noteRef: NoteRef): void {
    const noteRefSetting = this.saveState.data.refLabelSettings.find(
      (refLabelSettong): boolean => {
        return noteRef.referenceLabel
          ? refLabelSettong.refLabelName.toLowerCase() ===
              noteRef.referenceLabel.refLabelName
          : false;
      },
    );
    noteRefSetting
      ? (noteRef.visible = noteRefSetting.visible)
      : (noteRef.visible = false);
  }
}
