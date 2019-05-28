import { Injectable } from '@angular/core';
import { Navigation } from '../models/Navigation';
import { run } from '../../../../oith.format-tags/src/run';
import { Environment } from '../../../../oith.format-tags/src/Environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public navigation: Navigation[] | undefined;
  public notesDocument: Document | undefined;

  public noteDataAids: Map<string, boolean> = new Map();
  public chapterDocument: Document | undefined;

  public verses: [] | undefined;
  public notes: [] | undefined;
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

      this.chapterDocument = domParser.parseFromString(file, 'text/html');

      const chapterRoot = this.chapterDocument.querySelector('html');

      const chapterDataAid = chapterRoot
        ? chapterRoot.getAttribute('data-aid')
        : undefined;

      if (!chapterDataAid) {
        this.chapterDocument = undefined;
        alert('asodifj');
      }
      if (this.chapterDocument) {
        try {
          const asdf = await run(this.chapterDocument, Environment.browser);
          console.log(asdf);
        } catch (error) {
          console.log(error);
        }
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
}
