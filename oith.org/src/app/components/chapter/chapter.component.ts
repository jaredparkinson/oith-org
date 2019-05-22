import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { SaveStateService } from 'src/app/services/save-state.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  public constructor(
    public activatedRoute: ActivatedRoute,
    public paramService: ParamService,
    public chapterService: ChapterService,
    public router: Router,
    public saveStateService: SaveStateService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      async (params): Promise<void> => {
        // const chapterParams = this.paramService.parseChapterParams(params);
        // console.log(chapterParams);
        // const ids = await urlToChapterId(chapterParams, 'eng');

        // console.log(ids);

        // const chapterData = await axios.get(
        //   `assets/scripture_files/${ids}-wtags.json`,
        // );
        // const noteData = await axios.get(
        //   `assets/scripture_files/${ids}-notes.json`,
        // );
        // const verses = chapterData.data as Verse[];
        // const notes = noteData.data as Note[];
        // if (verses) {
        //   await this.chapterService.expandWTagCharacterCount(verses);
        //   console.log('test');

        //   this.chapterService.verses = verses;
        //   this.chapterService.notes = notes;
        // }
        try {
          await this.chapterService.queryChapter(params);
        } catch (error) {
          this.router.navigateByUrl('');
        }
      },
    );
  }

  private scrollNotesTop(): void {
    const note = document.querySelector('note');
    if (note) {
      note.scrollIntoView({ behavior: 'auto' });
    }
  }
  public scrollNoteIntoView(belowTop: Element[]): void {
    // let note: Element | undefined;
    if (
      ['title_number1', 'study_summary1', 'title1'].includes(belowTop[0].id)
    ) {
      this.scrollNotesTop();
    } else {
      const note = document.querySelector(
        `#${belowTop[0].id.replace('p', 'note')}`,
      );
      if (note) {
        setTimeout((): void => {
          note.scrollIntoView({ behavior: 'auto' });
        }, 300);
      }
    }
  }

  private scrollNotesBottom(): void {
    const notes = document.querySelectorAll('note');
    if (notes && notes[notes.length - 1]) {
      notes[notes.length - 1].scrollIntoView({ behavior: 'auto' });
    }
  }

  private scrollIntoView(belowTop: Element[]): void {
    if (belowTop.length > 0) {
      this.scrollNoteIntoView(belowTop);
    } else {
      this.scrollNotesBottom();
    }
  }
  public onScroll(): void {
    setTimeout((): void => {
      const verseElements = document.querySelectorAll('verse');
      // console.log(verseElements.length);
      if (verseElements && verseElements.length > 0) {
        if (verseElements[0].getBoundingClientRect().top > 34) {
          this.scrollNotesTop();
        } else {
          const belowTop: Element[] = Array.from(verseElements)
            .map(
              (verse): Element | undefined => {
                if (verse.getBoundingClientRect().top > 34) {
                  // console.log(verse);

                  return verse;
                } else {
                  return undefined;
                }
              },
            )
            .filter(
              (element): boolean => {
                return element !== undefined;
              },
            ) as Element[];
          if (verseElements) {
          }
          // console.log(belowTop.length);

          this.scrollIntoView(belowTop);
        }
      }
    }, 100);
  }
}
