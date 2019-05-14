import { Injectable } from '@angular/core';
import { Verse } from '../shared/enums/wtags';
import { range } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  public verses: Verse[];
  public constructor() {}

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
