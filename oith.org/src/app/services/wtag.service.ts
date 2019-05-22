import { Injectable } from '@angular/core';
import {
  WType,
  Verse,
  WMerged,
  WPoetry,
  WHighlight,
  WRichText,
  WUnderline,
  WRef,
} from 'oith.wtags';
import { intersection, isEqual, range } from 'lodash';
import { last } from '@angular/router/src/utils/collection';
import { WTagGroup } from 'oith.wtags/src/interfaces/WTagGroup';

@Injectable({
  providedIn: 'root',
})
export class WTagService {
  public wTagTypes = WType;

  public buildWTags(
    verse: Verse,
    wTagGroup: WTagGroup,
    wTypeFilter: WType[] = [
      this.wTagTypes.Base,
      this.wTagTypes.RichText,
      this.wTagTypes.Highlight,
      this.wTagTypes.Underline,
      this.wTagTypes.Refs,
      this.wTagTypes.Poetry,
      this.wTagTypes.Link,
      this.wTagTypes.RubyRB,
      this.wTagTypes.RubyRT,
    ],
  ): WMerged[] {
    if (verse && wTagGroup.charCount) {
      const wTags = verse.wTags
        ? verse.wTags.filter(
            (wTag): boolean => {
              return wTagGroup.charCount
                ? wTypeFilter.includes(wTag.wType) &&
                    intersection(
                      wTag.charCountUncompressed,
                      wTagGroup.charCount,
                    ).length > 0
                : false;
            },
          )
        : [];
      const wMergeds = wTagGroup.charCount.map(
        (num): WMerged => {
          const characterWTags = wTags.filter(
            (wTag): boolean => {
              return wTag.charCountUncompressed.includes(num);
            },
          );
          const wMerged: WMerged = new WMerged();
          wMerged.text = verse.text[num];

          wMerged.characterCount = [num];
          if (characterWTags.length > 0) {
            characterWTags.map(
              (characterWTag): void => {
                switch (characterWTag.wType) {
                  case this.wTagTypes.RichText: {
                    if (!wMerged.wRichText) {
                      wMerged.wRichText = [];
                    }
                    wMerged.wRichText.push(characterWTag as WRichText);
                    break;
                  }
                  case this.wTagTypes.Highlight: {
                    if (!wMerged.wHighlight) {
                      wMerged.wHighlight = [];
                    }
                    wMerged.wHighlight.push(characterWTag as WHighlight);
                    break;
                  }
                  case this.wTagTypes.Underline: {
                    if (!wMerged.wUnderline) {
                      wMerged.wUnderline = [];
                    }
                    wMerged.wUnderline.push(characterWTag as WUnderline);
                    break;
                  }
                  case this.wTagTypes.Refs: {
                    if (!wMerged.wRef) {
                      wMerged.wRef = [];
                    }
                    wMerged.wRef.push(characterWTag as WRef);
                    break;
                  }
                  case this.wTagTypes.Poetry: {
                    wMerged.wPoetry = characterWTag as WPoetry;
                    break;
                  }
                  case this.wTagTypes.RubyRB: {
                    break;
                  }
                  case this.wTagTypes.RubyRT: {
                    break;
                  }
                }
              },
            );
          }
          this.clearEmptyWMerged(wMerged);
          return wMerged;
          // console.log(wMerged);
        },
      );

      return this.mergeLikeWMerged(wMergeds);
      // console.log(wTags);
    } else {
      return [];
    }
  }

  private compareWMerged(wMerged1: WMerged, wMerged2: WMerged): boolean {
    return (
      isEqual(wMerged1.wHighlight, wMerged2.wHighlight) &&
      isEqual(wMerged1.wPoetry, wMerged2.wPoetry) &&
      isEqual(wMerged1.wRef, wMerged2.wRef) &&
      isEqual(wMerged1.wRichText, wMerged2.wRichText) &&
      isEqual(wMerged1.wUnderline, wMerged2.wUnderline)
    );
  }

  private mergeLikeWMerged(wMergeds: WMerged[]): WMerged[] {
    const merge: WMerged[] = [];

    let last: WMerged | undefined;

    wMergeds.map(
      (wMerged): void => {
        if (last) {
          if (this.compareWMerged(last, wMerged)) {
            last.characterCount = last.characterCount.concat(
              wMerged.characterCount,
            );
            last.text = `${last.text}${wMerged.text}`;
          } else {
            merge.push(last);
            last = wMerged;
          }
        } else {
          last = wMerged;
        }
      },
    );
    if (last) {
      merge.push(last);
      last = undefined;
    }
    return merge;
  }

  private clearEmptyWMerged(wMerged: WMerged): void {
    for (const key in wMerged) {
      if (wMerged[key] && (wMerged[key] as []).length === 0) {
        wMerged[key] = undefined;
      }
    }
  }
}
