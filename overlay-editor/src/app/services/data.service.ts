import { Injectable } from '@angular/core';
import { Navigation } from '../models/Navigation';
import { run } from '../../../../oith.format-tags/src/run';
import { Environment } from '../../../../oith.format-tags/src/Environment';
import { LDSSourceVerse } from '../../../../oith.format-tags/src/models/Verse';
import {
  NoteLDSSource,
  SecondaryNoteLDSSource,
  NoteRegLds,
} from '../../../../oith.notes/src/models/Note';
import { parseRefLabel } from './parseRefLabel';
import { ReQueue } from './ReQueue';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public navigation: Navigation[] | undefined;
  public notesDocument: Document | undefined;

  public noteDataAids: Map<string, boolean> = new Map();
  public chapterDocument: Document | undefined;

  public verses: LDSSourceVerse[] | undefined;
  public notes: NoteLDSSource[] | undefined;
  public allNotes: NoteLDSSource[] | undefined;
  public chapterDataAid: string | undefined;

  public editMode = false;
  public undoNotes: NoteLDSSource[][] = [];
  public redoNotes: NoteLDSSource[][] = [];
  public constructor() {}

  public loadNotesDocument(file: string): void {
    const domParser = new DOMParser();

    try {
      this.notesDocument = domParser.parseFromString(file, 'text/html');
      this.noteDataAids = new Map();

      this.notesDocument.querySelectorAll('div.chapter').forEach(
        (chapter): void => {
          const dataAid = chapter.getAttribute('data-aid');
          if (dataAid) {
            this.noteDataAids.set(dataAid, true);
          }
          this.parseNotes(chapter, dataAid as string);
        },
      );

      console.log(this.allNotes);

      // this.loadNavigation();
    } catch (error) {
      console.log(error);
    }
  }

  public editNotes(): void {
    if (this.verses) {
      const notes = this.verses.map(
        (verse): NoteLDSSource => {
          return verse.note;
        },
      );
      this.undoNotes.push(cloneDeep(notes));
      this.redoNotes = [];
    }
  }

  public reQueueNotes(reQueue: ReQueue): void {
    let changedNotes: NoteLDSSource[] | undefined;
    if (this.verses) {
      const notes = this.verses.map(
        (verse): NoteLDSSource => {
          return verse.note;
        },
      );
      if (reQueue === ReQueue.UNDO && notes && this.undoNotes.length > 0) {
        changedNotes = this.undoNotes.pop();
        this.redoNotes.push(cloneDeep(notes));
      } else if (
        reQueue === ReQueue.REDO &&
        notes &&
        this.redoNotes.length > 0
      ) {
        changedNotes = this.redoNotes.pop();
        this.undoNotes.push(cloneDeep(notes));
      }

      if (notes && changedNotes) {
        for (let x = 0; x < notes.length; x++) {
          const note = notes[x];
          const cnote = changedNotes[x];

          if (note && cnote) {
            note.secondaryNotes = cnote.secondaryNotes;
          }
        }
      }
    }
  }

  public getTextContent(element: Element, selector: string): string {
    const child = element.querySelector(selector);

    return child && child.textContent ? child.textContent : '';
  }

  public parseNoteRefs(secondaryNoteElement: Element): NoteRegLds[] {
    return Array.from(
      secondaryNoteElement.querySelectorAll(
        `[id="${secondaryNoteElement.id}"] > .note-reference`,
      ),
    ).map(
      (noteRefElement): NoteRegLds => {
        console.log();

        return {
          noteRef: noteRefElement.innerHTML,
          refLabel: parseRefLabel(
            (noteRefElement.childNodes[0] as Element).className,
          ),
        };
      },
    );
  }

  public parseSecondaryNotes(
    noteElement: Element,
    dataAid: string,
  ): SecondaryNoteLDSSource[] {
    return Array.from(
      noteElement.querySelectorAll(
        `div.chapter[data-aid="${dataAid}"] [id="${noteElement.id}"] > div`,
      ),
    ).map(
      (secondaryNoteElement): SecondaryNoteLDSSource => {
        // console.log(secondaryNoteElement);
        const secondaryNote = new SecondaryNoteLDSSource();

        secondaryNote.classList = Array.from(secondaryNoteElement.classList);
        secondaryNote.id = secondaryNoteElement.id;
        secondaryNote.notePhrase = this.getTextContent(
          secondaryNoteElement,
          '.note-phrase',
        );

        secondaryNote.noteRefs = this.parseNoteRefs(secondaryNoteElement);
        secondaryNote.offsets = this.getAttribute(
          secondaryNoteElement,
          'offset',
        );
        if (secondaryNote.offsets.length > 0) {
          console.log(secondaryNote.notePhrase);

          console.log(secondaryNote.offsets);
        }

        return secondaryNote;
      },
    );
  }

  public parseNotes(noteChapterElement: Element, dataAid: string): void {
    Array.from(noteChapterElement.querySelectorAll('note')).map(
      (noteElement): void => {
        const note = new NoteLDSSource();
        note.chaterDataAid = dataAid;
        note._id = noteElement.id;
        note.noteShortTitle = this.getTextContent(
          noteElement,
          '.note-short-title',
        );
        note.noteTitle = this.getTextContent(noteElement, '.note-title');
        // console.log(note);

        note.secondaryNotes = this.parseSecondaryNotes(noteElement, dataAid);

        // console.log(note);
        if (!this.allNotes) {
          this.allNotes = [];
        }
        this.allNotes.push(note);

        //  this.getAttribute(noteElement, 'offset');
      },
    );
    // console.log(this.allNotes);
  }
  public async loadChapterFile(file: string): Promise<void> {
    const domParser = new DOMParser();

    try {
      console.log('loaded Chapter File');

      const newDocument = domParser.parseFromString(file, 'text/html');

      this.chapterDocument = newDocument;

      const chapterRoot = this.chapterDocument.querySelector('[data-aid]');
      this.chapterDataAid = chapterRoot
        ? this.getAttribute(chapterRoot, 'data-aid')
        : undefined;

      const titleElemment = newDocument.querySelector('title');
      const title =
        titleElemment && titleElemment.textContent
          ? titleElemment.textContent
          : '';

      if (!this.chapterDataAid) {
        this.chapterDocument = undefined;
        alert('asodifj');
      }
      try {
        const verses = (await run(
          newDocument,
          Environment.browser,
        )) as LDSSourceVerse[];
        this.verses = verses;

        if (this.notesDocument) {
          const chapterNotes = this.notesDocument.querySelector(
            `div.chapter[data-aid="${this.chapterDataAid}"]`,
          );
          if (chapterNotes && this.allNotes) {
            this.notes = this.allNotes.filter(
              (note): boolean => {
                return note.chaterDataAid === this.chapterDataAid;
              },
            );
            this.addExistingNotesToVerses(
              this.verses,
              this.allNotes,
              this.chapterDataAid as string,
              title,
            );
            // console.log(this.notes);
          } else {
            await this.addNoteTemplates(newDocument, this.verses, title);
          }
        } else {
          await this.addNoteTemplates(newDocument, this.verses, title);
        }
        // console.log(this.verses);
      } catch (error) {
        console.log(error);
        this.chapterDocument = undefined;
      }
      // this.loadNavigation();
    } catch (error) {}
  }
  public addExistingNotesToVerses(
    verses: LDSSourceVerse[],
    notes: NoteLDSSource[],
    chapterDataAid: string,
    title: string,
  ): void {
    verses.map(
      (verse): void => {
        if (verse.id.startsWith('p')) {
          const id = verse.id.replace('p', 'note');

          const note = notes.find(
            (note): boolean => {
              return note.chaterDataAid === chapterDataAid && note._id === id;
            },
          );
          // console.log(note);
          if (note) {
            verse.note = note;
            this.createEmptyNote(verse, note, title);
            // this.fillEmptyNote(verse, note);
          }
        }
      },
    );
    console.log(verses);

    // notes
    //   .filter(
    //     (note): boolean => {
    //       return note.chaterDataAid === chapterDataAid;
    //     },
    //   )
    //   .map(
    //     (note): void => {
    //       const verse = verses.find(
    //         (verse): boolean => {
    //           const id = note._id ? note._id.replace('note', 'p') : '';
    //           return verse.id === id && note.chaterDataAid === chapterDataAid;
    //         },
    //       );
    //       if (verse) {
    //         verse.note = note;
    //       }
    //     },
    //   );
  }

  // private loadNavigation(): void {
  //   if (!this.navigation && this.notesDocument) {
  //     this.navigation = [];
  //     Array.from(
  //       this.notesDocument.querySelectorAll('body > ul > li > p > a'),
  //     ).map(
  //       (a: HTMLAnchorElement): void => {
  //         const nav: Navigation = {
  //           text: a.textContent,
  //           href: a.href,
  //         };
  //         if (nav.text && nav.href && this.navigation) {
  //           this.navigation.push(nav);
  //         }
  //       },
  //     );
  //   }
  // }

  private getVerseNumber(verse: Element): string {
    const verseNumber = verse.querySelector('.verse-number');
    if (verseNumber) {
      return verseNumber.textContent ? verseNumber.textContent.trim() : '';
    }

    return verse.id;
  }
  private getAttribute(element: Element, attr: string): string {
    const attribute = element.getAttribute(attr);
    return attribute ? attribute : '';
  }

  private getHeaderNotes(document: Document, title: string): void {
    const title1Note = new NoteLDSSource();
    title1Note._id = 'title1_note';
    title1Note.noteShortTitle = 'Title 1 Notes';
    title1Note.noteTitle = `${title}:Title 1 Notes`;

    const titleNumberNote = new NoteLDSSource();
    titleNumberNote._id = 'title_number1_note';
    titleNumberNote.noteShortTitle = 'Title Number Notes';
    titleNumberNote.noteTitle = `${title}:Title Number Notes`;

    const studySummaryNote = new NoteLDSSource();
    studySummaryNote._id = 'study_number1_note';
    studySummaryNote.noteShortTitle = `${title}:Study Number Notes`;
    studySummaryNote.noteTitle = 'Study Number Notes';

    if (this.notes) {
      if (document.querySelector('title1')) {
        this.notes.push(title1Note);
      }
      if (document.querySelector('title_number1')) {
        this.notes.push(titleNumberNote);
      }
      if (document.querySelector('study_summary1')) {
        this.notes.push(studySummaryNote);
      }
    }
  }
  private async addNoteTemplates(
    document: Document,
    verses: LDSSourceVerse[],
    title: string,
  ): Promise<void> {
    // const verseElements = await queryVerseElements(document);
    // const titleElemment = document.querySelector('title');
    // const title =
    //   titleElemment && titleElemment.textContent
    //     ? titleElemment.textContent
    //     : '';
    this.notes = [];

    verses.map(
      (verse): void => {
        const verseElement = document.getElementById(verse.id);
        if (verseElement) {
          // const verseNumber = this.getVerseNumber(verseElement);
          const note = new NoteLDSSource();
          // this.createEmptyNote(note, verseNumber, title, verse);
          this.createEmptyNote(verse, note, title);
        }
      },
    );
    // if (verseElements) {
    //   this.getHeaderNotes(document, title);
    //   const chapterNote = new NoteLDSSource();

    //   chapterNote.noteShortTitle = `${title} Notes`;
    //   chapterNote.noteShortTitle = `${title} Notes`;

    //   verseElements.map(
    //     (verse): void => {
    //       const verseNumber = this.getVerseNumber(verse);
    //       if (verseNumber.trim() !== '') {
    //         const note = new NoteLDSSource();
    //         note._id = `note${verseNumber}`;
    //         note.noteTitle = `${title}:${verseNumber} Notes`;
    //         note.noteShortTitle = `Verse ${verseNumber} Notes`;
    //         if (this.notes) {
    //           this.notes.push(note);
    //         }
    //         // console.log(verseNumber);
    //       }
    //     },
    //   );
    // }

    // console.log(this.notes);
  }

  private createEmptyNote(
    verse: LDSSourceVerse,
    note: NoteLDSSource,
    title: string,
  ): void {
    const verseNumber = verse.id.startsWith('p')
      ? verse.id.replace('p', '')
      : verse.id;
    note._id = `note${verseNumber}`;
    note.noteTitle = `${title}:${verseNumber} Notes`;
    note.noteShortTitle = `Verse ${verseNumber} Notes`;
    if (this.notes) {
      this.notes.push(note);
    }
    verse.note = note;
  }
}
