import { Injectable } from '@angular/core';
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
  public notePhrases: Map<string, NotePhrase> = new Map<string, NotePhrase>();
  public noteRefs: Map<string, NoteRef> = new Map<string, NoteRef>();
  public secondaryNotes = new Map<string, SecondaryNote>();
  public noteVis = new Map<string, boolean>();
  private chapter: Chapter | undefined;
  public constructor(private saveState: SaveStateService) {}

  public async resetChapterVisbility(): Promise<void> {
    if (this.chapter) {
      this.flattenChapter(this.chapter);
    }
  }
  public async setChapter(chapter: Chapter): Promise<void> {
    this.chapter = chapter;
  }
  public flattenChapter(chapter: Chapter): void {
    this.chapter = chapter;
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
                  this.resetRefFTags(f as WRef);
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
              secondaryNote.highlight = false;
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

  public async resetNoteHighlight(id: string): Promise<void> {
    this.mapToArray(this.secondaryNotes).map(
      (secondaryNote): void => {
        if (secondaryNote.id === id) {
          secondaryNote.highlight = true;
        } else {
          secondaryNote.highlight = false;
        }
      },
    );
  }

  private mapToArray<T, T1>(map: Map<T, T1>): T1[] {
    return Array.from(map.values());
  }

  private setSecondaryNoteVisibility(secondaryNote: SecondaryNote): void {
    if (secondaryNote.notePhrase) {
      secondaryNote.noteRefs.map(
        (noteRef): void => {
          this.setNoteRefVisibility(noteRef);
        },
      );
      this.setNotePhraseVisibility(secondaryNote);
    }
  }

  private setNotePhraseVisibility(secondaryNote: SecondaryNote): void {
    // notePhrase.visible =this.getNoteTypeVis(notePhrase.)
    if (secondaryNote.notePhrase) {
      secondaryNote.notePhrase.visible =
        secondaryNote.noteRefs.filter(
          (noteRef): boolean => {
            return noteRef.visible === true;
          },
        ).length > 0;
      this.noteVis.set(secondaryNote.id, secondaryNote.notePhrase.visible);
    }
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
