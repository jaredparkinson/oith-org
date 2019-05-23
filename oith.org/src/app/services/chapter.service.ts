import { Injectable } from '@angular/core';
import { range } from 'lodash';
import { DataService } from './data.service';
import { ChapterParams } from './ChapterParams';
import { Params } from '@angular/router';
import { ParamService } from './param.service';
import { addVersesToParagraphs } from './addVersesToParagraphs';
import { RefService } from './ref.service';
import { Chapter, Verse, Note } from '../../../../oith.shared';
@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public verses: Verse[];

  public chapter: Chapter;
  public notes: Note[] | undefined;
  public constructor(
    private dataService: DataService,
    private paramService: ParamService,
    private refService: RefService,
  ) {}

  private expandRange(compressedRanges: [number, number][]): number[] {
    let newRange: number[] = [];

    compressedRanges.map(
      (compressedRange): void => {
        newRange = newRange.concat(
          range(compressedRange[0], compressedRange[1]),
        );
      },
    );
    return newRange;
  }
  public async queryChapter(params: Params): Promise<void> {
    try {
      const chapterParams = this.paramService.parseChapterParams(params);
      console.log(chapterParams);

      const baseID = `${chapterParams.book}-${chapterParams.chapter}-eng`;
      const chapterID = `${baseID}-chapter.json`;
      const versesID = `${baseID}-wtags.json`;
      const notesID = `${baseID}-notes.json`;

      const chapter = await this.dataService.queryChapterData<Chapter>(
        chapterID,
      );
      const verses = await this.dataService.queryChapterData<Verse[]>(versesID);
      const notes = await this.dataService.queryChapterData<Note[]>(notesID);
      await this.expandWTagCharacterCount(verses);
      await addVersesToParagraphs(chapter, verses);

      this.refService.initRefVisibility(notes);
      this.refService.flattenRefs(notes);
      chapter.verses = verses;
      chapter.notes = notes;
      this.chapter = chapter;
    } catch (error) {
      throw error;
    }
  }

  public async expandWTagCharacterCount(verses: Verse[]): Promise<void> {
    verses.map(
      (verse): void => {
        if (verse.wTagGroups) {
          verse.wTagGroups.map(
            (wTagGroup): void => {
              wTagGroup.charCount = range(
                wTagGroup.charCountCompress[0],
                wTagGroup.charCountCompress[1],
              );
            },
          );
        }
        if (verse.wTags) {
          verse.wTags.map(
            (wTag): void => {
              wTag.charCountUncompressed = this.expandRange(wTag.charCount);
            },
          );
        }
      },
    );
  }
}

export async function urlToIDs(
  chapterParams: ChapterParams,
  language: string,
): Promise<string> {
  return `${chapterParams.book}-${chapterParams.chapter}-${language}`;
}
