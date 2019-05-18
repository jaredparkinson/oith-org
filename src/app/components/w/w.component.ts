import { Component, OnInit, Input } from '@angular/core';
import { WMerged, RichText, RichTextEnum } from 'oith.wtags';
import { multiIncludes } from './multiIncludes';
import { MarkService } from 'src/app/services/mark.service';
import { PreMarkdown } from './PreMarkdown';

@Component({
  selector: 'app-w',
  templateUrl: './w.component.html',
  styleUrls: ['./w.component.scss'],
})
export class WComponent implements OnInit {
  @Input() public w: WMerged;
  public ref = false;
  public constructor(public markService: MarkService) {}
  public ngOnInit(): void {
    if (this.w.wRef) {
      this.ref = true;
    }
  }

  public getClassList(): string {
    const classList: string[] = [];

    if (this.w.wRichText) {
      this.w.wRichText.map(
        (richText): void => {
          switch (richText.richText) {
            case RichText.verseNumber: {
              classList.push('verse-number');
            }
          }
        },
      );
    }
    // console.log(classList);

    return classList.toString().replace(',', ' ');
  }

  public getMarkDown(): string {
    const preMarkDown = new PreMarkdown();
    preMarkDown.text = this.w.text;
    if (this.w.wRichText) {
      const richTexts = this.w.wRichText.map(
        (rich): RichText => {
          return rich.richText;
        },
      );

      if (!preMarkDown.bold) {
        preMarkDown.bold = multiIncludes([RichTextEnum.verseNumber], richTexts);
      }
      if (!preMarkDown.italic) {
        preMarkDown.italic = multiIncludes(
          [RichTextEnum.clarityWord],
          richTexts,
        );
      }
    }

    return preMarkDown.getMarkdown();
  }

  public click(): void {
    if (this.w.wRef) {
      console.log('asdf');

      this.w.wRef = undefined;
    }
  }
}
