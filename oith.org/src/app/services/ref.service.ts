import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { flatten } from 'lodash';
import { SaveStateService } from './save-state.service';
import {
  Note,
  NoteTypeEnum,
  SecondaryNote,
  NoteRef,
  NoteType,
  NotePhrase,
  Chapter,
  WRef,
} from '../../../../oith.shared';
import { wType } from '../../../../oith.wtags/src/enums/WType';

@Injectable({
  providedIn: 'root',
})
export class RefService {
  public refs: Map<string, boolean> = new Map<string, boolean>();
  public notePhrases: NotePhrase[] = [];
  public noteRefs: NoteRef[] = [];
  public secondaryNotes = new Map<string, SecondaryNote>();
  public noteVis = new Map<string, boolean>();
  public constructor(private saveState: SaveStateService) {}
  public initRefVisibility(notes: Note[]): void {
    // flatten(
    //   notes.map(
    //     (note): void => {
    //       if (note.secondaryNotes) {
    //         note.secondaryNotes.map(
    //           (secondaryNote): void => {
    //             secondaryNote.noteRefs.map(
    //               (noteRef): void => {
    //                 switch (noteRef.type) {
    //                   case NoteTypeEnum.Eng: {
    //                     this.refs.set(
    //                       noteRef._id,
    //                       this.saveState.data.englishNotesVisible,
    //                     );
    //                     break;
    //                   }
    //                   case NoteTypeEnum.New: {
    //                     this.refs.set(
    //                       noteRef._id,
    //                       this.saveState.data.newNotesVisible,
    //                     );
    //                     break;
    //                   }
    //                   case NoteTypeEnum.TC: {
    //                     this.refs.set(
    //                       noteRef._id,
    //                       this.saveState.data.translatorNotesVisible,
    //                     );
    //                     break;
    //                   }
    //                 }
    //               },
    //             );
    //           },
    //         );
    //       }
    //     },
    //   ),
    // );
  }

  public flattenChapter(chapter: Chapter): void {
    if (chapter.notes) {
      this.flattenNotes(chapter.notes);
      // chapter.verses
    }
    if (chapter.verses) {
      chapter.verses.map(
        (verse): void => {
          if (verse.wTags) {
            verse.wTags.map(
              (f): void => {
                if (f.wType === wType.Refs) {
                  this.resetRefFTags(f);
                }
              },
            );
          }
        },
      );
    }
  }
  public resetRefFTags(fTags: WRef): void {
    // if () {
    // this.flattenNotes(chapter.notes);
    // }
    fTags.visible = this.noteVis.get(fTags.ref);
  }

  public flattenNotes(notes: Note[]): void {
    notes.map(
      (note): void => {
        if (note.secondaryNotes) {
          note.secondaryNotes.map(
            (secondaryNote): void => {
              this.secondaryNotes.set(secondaryNote.id, secondaryNote);
              this.setSecondaryNoteVisibility(secondaryNote);
              secondaryNote.noteRefs.map(
                (noteRef): void => {
                  this.setNoteRefVisibility(noteRef);
                  // this.noteRefs.push(noteRef);
                },
              );
            },
          );
        }
      },
    );
  }

  public resetSecondaryNotesVisibility(): void {
    Array.from(this.secondaryNotes.values()).map(
      (secondaryNote): void => {
        this.setSecondaryNoteVisibility(secondaryNote);
      },
    );
  }

  private setSecondaryNoteVisibility(secondaryNote: SecondaryNote): void {
    if (secondaryNote.notePhrase) {
      secondaryNote.noteRefs.map(
        (noteRef): void => {
          this.setNoteRefVisibility(noteRef);
        },
      );
      this.setNotePhraseVisibility(
        secondaryNote.notePhrase,
        secondaryNote.noteRefs,
      );
    }
  }

  private setNotePhraseVisibility(
    notePhrase: NotePhrase,
    noteRefs: NoteRef[],
  ): void {
    // notePhrase.visible =this.getNoteTypeVis(notePhrase.)
    notePhrase.visible =
      noteRefs.filter(
        (noteRef): boolean => {
          return noteRef.visible === true;
        },
      ).length > 0;
    this.noteVis.set(notePhrase._id, notePhrase.visible);
  }

  private setNoteRefVisibility(noteRef: NoteRef): void {
    const noteRefSetting = this.saveState.data.refLabelSettings.find(
      (refLabelSettong): boolean => {
        return noteRef.referenceLabel
          ? refLabelSettong.refLabelName.toLowerCase() ===
              noteRef.referenceLabel.refLabelName
          : false;
        //this.getNoteTypeVis(noteRef.type);
      },
    );
    // this.getNoteTypeVis(noteRef.type);
    noteRefSetting
      ? (noteRef.visible =
          noteRefSetting.visible === true &&
          this.getNoteTypeVis(noteRef.type) === true)
      : (noteRef.visible = this.getNoteTypeVis(noteRef.type));
  }

  public getNoteTypeVis(n: NoteType | undefined): boolean {
    switch (n) {
      case NoteTypeEnum.Eng: {
        return this.saveState.data.englishNotesVisible;
      }
      case NoteTypeEnum.New: {
        return this.saveState.data.newNotesVisible;
      }
      case NoteTypeEnum.TC: {
        console.log('jhh9');

        return this.saveState.data.translatorNotesVisible;
      }
    }
    return false;
  }
}
