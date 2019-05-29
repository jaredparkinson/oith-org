import { Injectable } from '@angular/core';
import { Navigation } from '../models/Navigation';
import { run } from '../../../../oith.format-tags/src/run';
import { Environment } from '../../../../oith.format-tags/src/Environment';
import {
  Verse,
  LDSSourceVerse,
} from '../../../../oith.format-tags/src/models/Verse';
import { Note, SecondaryNote } from '../../../../oith.shared';
import { queryVerseElements } from '../../../../oith.format-tags/src/functions/queryVerseElements';
import {
  NoteLDSSource,
  SecondaryNoteLDSSource,
} from '../../../../oith.notes/src/models/Note';

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

      // this.loadNavigation();
    } catch (error) {
      console.log(error);
    }
  }

  public getTextContent(element: Element, selector: string): string {
    const child = element.querySelector(selector);

    return child && child.textContent ? child.textContent : '';
  }

  public parseNoteRefs(secondaryNoteElement: Element): string[] {
    return Array.from(
      secondaryNoteElement.querySelectorAll(
        `[id="${secondaryNoteElement.id}"] > .note-reference`,
      ),
    ).map(
      (noteRefElement): string => {
        return noteRefElement.innerHTML;
      },
    );
  }

  public parseSecondaryNotes(noteElement: Element): SecondaryNoteLDSSource[] {
    return Array.from(
      noteElement.querySelectorAll(`[id="${noteElement.id}"] > div`),
    ).map(
      (secondaryNoteElement): SecondaryNoteLDSSource => {
        // console.log(secondaryNoteElement);
        const secondaryNote = new SecondaryNoteLDSSource();

        secondaryNote.classList = Array.from(secondaryNoteElement.classList);
        secondaryNote.id = secondaryNote.id;
        secondaryNote.notePhrase = this.getTextContent(
          secondaryNoteElement,
          '.note-phrase',
        );
        secondaryNote.noteRefs = this.parseNoteRefs(secondaryNoteElement);
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

        note.secondaryNotes = this.parseSecondaryNotes(noteElement);
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
            this.addExistingNotesToVerses(this.verses, this.notes);
            // console.log(this.notes);
          } else {
            await this.addNoteTemplates(newDocument, this.verses);
          }
        } else {
          await this.addNoteTemplates(newDocument, this.verses);
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
  ): void {
    notes.map(
      (note): void => {
        const verse = verses.find(
          (verse): boolean => {
            const id = note._id ? note._id.replace('note', 'p') : '';
            return verse.id === id;
          },
        );
        if (verse) {
          verse.note = note;
        }
      },
    );
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
  ): Promise<void> {
    const verseElements = await queryVerseElements(document);
    const titleElemment = document.querySelector('title');
    const title =
      titleElemment && titleElemment.textContent
        ? titleElemment.textContent
        : '';
    this.notes = [];

    verses.map(
      (verse): void => {
        const verseElement = document.getElementById(verse.id);
        if (verseElement) {
          const verseNumber = this.getVerseNumber(verseElement);
          const note = new NoteLDSSource();
          note._id = `note${verseNumber}`;
          note.noteTitle = `${title}:${verseNumber} Notes`;
          note.noteShortTitle = `Verse ${verseNumber} Notes`;
          if (this.notes) {
            this.notes.push(note);
          }
          verse.note = note;
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
}
function parseOffset(compressedOffset: string): number[] {
  let offsetSplit: number[] = [];
  compressedOffset.split(',').map(
    (r): void => {
      if (r.indexOf('-') !== -1) {
        const split2 = r.split('-');
        const f = parseInt(split2[0]);
        const l = parseInt(split2[1]);
        offsetSplit = offsetSplit.concat(range(f, l));
      } else {
        offsetSplit.push(parseInt(r));
      }
    },
  );
  return offsetSplit;
}
