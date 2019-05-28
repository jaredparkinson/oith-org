import { Injectable } from '@angular/core';
import { Navigation } from '../models/Navigation';
import { run } from '../../../../oith.format-tags/src/run';
import { Environment } from '../../../../oith.format-tags/src/Environment';
import { Verse } from '../../../../oith.format-tags/src/models/Verse';
import { Note } from '../../../../oith.shared';
import { queryVerseElements } from '../../../../oith.format-tags/src/functions/queryVerseElements';
import { NoteLDSSource } from '../../../../oith.notes/src/models/Note';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public navigation: Navigation[] | undefined;
  public notesDocument: Document | undefined;

  public noteDataAids: Map<string, boolean> = new Map();
  public chapterDocument: Document | undefined;

  public verses: Verse[] | undefined;
  public notes: NoteLDSSource[] | undefined;
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
        },
      );

      this.loadNavigation();
    } catch (error) {}
  }
  public async loadChapterFile(file: string): Promise<void> {
    const domParser = new DOMParser();

    try {
      console.log('loaded Chapter File');

      const newDocument = domParser.parseFromString(file, 'text/html');

      this.chapterDocument = newDocument;

      const chapterRoot = newDocument.querySelector('html');

      const chapterDataAid = chapterRoot
        ? chapterRoot.getAttribute('data-aid')
        : undefined;

      if (!chapterDataAid) {
        this.chapterDocument = undefined;
        alert('asodifj');
      }
      try {
        const verses = await run(newDocument, Environment.browser);
        this.verses = verses;

        if (this.notesDocument) {
          const chapterNotes = document.querySelector(
            `div.chapter[data-aid="${chapterDataAid}"]`,
          );
          if (chapterNotes) {
            console.log(chapterNotes.id);
          }
        } else {
          this.addNoteTemplates(newDocument);
        }
        console.log(this.verses);
      } catch (error) {
        console.log(error);
        this.chapterDocument = undefined;
      }
      // this.loadNavigation();
    } catch (error) {}
  }

  private loadNavigation(): void {
    if (!this.navigation && this.notesDocument) {
      this.navigation = [];
      Array.from(
        this.notesDocument.querySelectorAll('body > ul > li > p > a'),
      ).map(
        (a: HTMLAnchorElement): void => {
          const nav: Navigation = {
            text: a.textContent,
            href: a.href,
          };
          if (nav.text && nav.href && this.navigation) {
            this.navigation.push(nav);
          }
        },
      );
    }
  }

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
  private async addNoteTemplates(document: Document): Promise<void> {
    const verseElements = await queryVerseElements(document);
    const titleElemment = document.querySelector('title');
    const title =
      titleElemment && titleElemment.textContent
        ? titleElemment.textContent
        : '';
    this.notes = [];
    if (verseElements) {
      this.getHeaderNotes(document, title);
      const chapterNote = new NoteLDSSource();

      chapterNote.noteShortTitle = `${title} Notes`;
      chapterNote.noteShortTitle = `${title} Notes`;

      verseElements.map(
        (verse): void => {
          const verseNumber = this.getVerseNumber(verse);
          if (verseNumber.trim() !== '') {
            const note = new NoteLDSSource();
            note._id = `note${verseNumber}`;
            note.noteTitle = `${title}:${verseNumber} Notes`;
            note.noteShortTitle = `Verse ${verseNumber} Notes`;
            if (this.notes) {
              this.notes.push(note);
            }
            console.log(verseNumber);
          }
        },
      );
    }

    console.log(this.notes);
  }
}
