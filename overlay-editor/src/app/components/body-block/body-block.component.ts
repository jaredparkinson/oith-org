import { saveAs } from 'file-saver';
import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../../../../../oith.shared';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';
import { DataService } from 'src/app/services/data.service';
import { ReQueue } from 'src/app/services/ReQueue';
import { SecondaryNoteLDSSource } from '../../../../../oith.notes/src/models/Note';
import { getRanges } from './getRanges';

@Component({
  selector: 'app-body-block',
  templateUrl: './body-block.component.html',
  styleUrls: ['./body-block.component.scss'],
})
export class BodyBlockComponent implements OnInit {
  @Input() public verses: LDSSourceVerse[];
  public constructor(public dataService: DataService) {}

  public ngOnInit(): void {
    console.log(this.verses);
  }

  public addNoteTest(req: ReQueue): void {
    this.dataService.reQueueNotes(req);

    console.log('hhh');
  }

  private secondarysNoteToString(
    secondaryNotes: SecondaryNoteLDSSource[],
  ): string {
    let secondaryNoteStrings = '';
    secondaryNotes.map(
      (secondaryNote): string => {
        const notePhraseString = `<p class="note-phrase">${
          secondaryNote.notePhrase
        }</p>`;
        const noteRefString = secondaryNote.noteRefs.map(
          (noteRef): string => {
            return `<p class="note-reference">${noteRef.noteRef}</p>`;
          },
        );
        if (secondaryNote.uncompressedOffsets) {
          console.log(secondaryNote.offsets);

          console.log(getRanges(secondaryNote.uncompressedOffsets as number[]));
        }
        const secondaryNoteToString = `<div class="${
          secondaryNote.classList
        }" id="${secondaryNote.id}" offset="${secondaryNote.offsets}">
				${notePhraseString}
        ${noteRefString}</div>`;
        secondaryNoteStrings = `${secondaryNoteStrings}${secondaryNoteToString}`;
        return secondaryNoteToString;
      },
    );
    return secondaryNoteStrings;
  }

  private async noteToString(
    verses: LDSSourceVerse[],
    document: Document,
  ): Promise<void> {
    verses.map(
      (verse): void => {
        if (verse.note) {
          const noteElement = document.querySelector(
            `div.chapter[data-aid="${verse.note.chaterDataAid}"] #${
              verse.note._id
            }`,
          );

          if (noteElement && verse.note.secondaryNotes) {
            const secondary = this.secondarysNoteToString(
              verse.note.secondaryNotes,
            );

            const noteString = `
            <p class="note-title">${verse.note.noteTitle}</p>
            <p class="note-short-title">${verse.note.noteShortTitle}</p>
            ${secondary}`;
            noteElement.innerHTML = noteString;
            // console.log(noteString);
          }
        }
      },
    );
  }

  public async save(): Promise<void> {
    if (this.dataService.notesDocument && this.dataService.verses) {
      await this.noteToString(
        this.dataService.verses,
        this.dataService.notesDocument,
      );
      const notesDocument = new XMLSerializer().serializeToString(
        this.dataService.notesDocument,
      );
      const blob = new Blob([notesDocument], {
        type: 'text/html;charset=utf=8',
      });
      saveAs(blob, 'test.html');
      console.log(blob);
    }
  }
}
