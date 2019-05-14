import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { WMerged, RichText } from '../shared/enums/wtags';

@Directive({
  selector: '[appWTag]',
})
export class WTagDirective implements AfterViewInit {
  @Input() public wMerged: WMerged;
  public constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    if (this.wMerged) {
      if (this.wMerged.wRef) {
        this.el.nativeElement.style.backgroundColor = 'red';
      }
      if (this.wMerged.wRichText) {
        this.wMerged.wRichText.map(
          (wRichText): void => {
            switch (wRichText.richText) {
              case RichText.verseNumber: {
                (this.el.nativeElement as HTMLElement).style.fontWeight =
                  'bold';
              }
            }
          },
        );
      }
    }
  }
}
