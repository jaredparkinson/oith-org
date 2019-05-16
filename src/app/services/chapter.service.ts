import { Injectable } from '@angular/core';
import { Verse } from 'oith.wtags';
import { range } from 'lodash';
import { Note } from 'oith.notes/src/models/Note';
import { DataService } from './data.service';
import { ChapterParams } from './ChapterParams';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public verses: Verse[];
  public notes: Note[] | undefined;
  public constructor(private dataService: DataService) {}

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
  public async expandWTagCharacterCount(verses: Verse[]): Promise<void> {
    verses.map(
      (verse): void => {
        if (verse.wTagGroups) {
          verse.wTagGroups.map(
            (wTagGroup): void => {
              wTagGroup.charCount = range(
                wTagGroup.charCountCompress[0],
                wTagGroup.charCountCompress[1] + 1,
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
