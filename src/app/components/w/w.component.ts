import { Component, OnInit, Input } from '@angular/core';
import { WMerged, RichText, WRichText } from 'oith.wtags';
import { multiIncludes } from './multiIncludes';
import { MarkService } from 'src/app/services/mark.service';
import { PreMarkdown } from './PreMarkdown';

@Component({
  selector: 'app-w',
  templateUrl: './w.component.html',
  styleUrls: ['./w.component.scss'],
})
export class WComponent implements OnInit {
  private richTextEnum = RichText;
  @Input() public w: WMerged;
  public ref = false;
  public constructor(public markService: MarkService) {}
  public ngOnInit(): void {
    if (this.w.wRef) {
      this.ref = true;
    }
  }

  public getClassList(classList: string[] | undefined): string {
    return classList ? classList.toString().replace(',', ' ') : '';
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
        preMarkDown.bold = multiIncludes(
          [this.richTextEnum.verseNumber],
          richTexts,
        );
      }
      if (!preMarkDown.italic) {
        preMarkDown.italic = multiIncludes(
          [this.richTextEnum.clarityWord],
          richTexts,
        );
      }
    }

    return preMarkDown.getMarkdown();
  }

  public isBoldItalicOrBoth(richText: WRichText[]): string {
    const bold = false;
    const italic = false;
    const preMarkDown = new PreMarkdown();

    if (richText) {
      const richTexts = richText.map(
        (rich): RichText => {
          return rich.richText;
        },
      );

      preMarkDown.bold = multiIncludes(
        [this.richTextEnum.verseNumber],
        richTexts,
      );
      preMarkDown.italic = multiIncludes(
        [this.richTextEnum.clarityWord],
        richTexts,
      );

      // console.log(bold);
      // console.log(italic);

      if (bold && italic) {
        return 'bolditalica';
      } else if (bold && !italic) {
        return 'bold';
      } else if (!bold && italic) {
        return 'italic';
      }
    }
    return '';
  }

  public click(): void {
    if (this.w.wRef) {
      console.log('asdf');

      this.w.wRef = undefined;
    }
  }

  public renderText(): string {
    if (this.w.wRichText && this.w.text) {
      const richTexts = this.w.wRichText.map(
        (rich): RichText => {
          return rich.richText;
        },
      );
      const temp = this.markService.renderWTagMark(richTexts, this.w.text);
      return this.markService.renderWTagMark(richTexts, this.w.text);
    } else {
      return this.w.text ? this.w.text : '';
    }
  }
}
