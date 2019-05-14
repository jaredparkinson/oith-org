import { Component, OnInit, Input } from '@angular/core';
import { WMerged, RichText, WRichText } from 'src/app/shared/enums/wtags';
import { multiIncludes } from './multiIncludes';

@Component({
  selector: 'app-w',
  templateUrl: './w.component.html',
  styleUrls: ['./w.component.scss'],
})
export class WComponent implements OnInit {
  private richTextEnum = RichText;
  @Input() public w: WMerged;
  public ref = false;
  public constructor() {}
  public ngOnInit(): void {
    if (this.w.wRef) {
      this.ref = true;
    }
  }

  public getClassList(classList: string[] | undefined): string {
    return classList ? classList.toString().replace(',', ' ') : '';
  }

  public isBoldItalicOrBoth(richText: WRichText[]): string {
    if (richText) {
      const richTexts = richText.map(
        (rich): RichText => {
          return rich.richText;
        },
      );

      const bold = multiIncludes([this.richTextEnum.verseNumber], richTexts);
      const italic = multiIncludes([this.richTextEnum.clarityWord], richTexts);
      console.log(bold);
      console.log(italic);

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
}
