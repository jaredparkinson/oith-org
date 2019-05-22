import {
  Directive,
  Input,
  ElementRef,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { WMerged, RichText, WRef, Color } from 'oith.wtags';
import { last } from 'lodash';

@Directive({
  selector: '[appWTag]',
})
export class WTagDirective implements AfterViewInit, DoCheck {
  @Input() public wMerged: WMerged;
  private element: HTMLElement;
  public color = Color;
  public constructor(private el: ElementRef) {
    this.element = el.nativeElement as HTMLElement;
  }

  public ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.element.className = '';
    if (this.wMerged) {
      if (this.wMerged.wRef) {
        this.addRefStyling(this.wMerged.wRef);
      }
      if (this.wMerged.wHighlight) {
        this.convertToColor('highlight', last(this.wMerged.wHighlight));
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.wMerged) {
      if (this.wMerged.wRef) {
        this.addRefStyling(this.wMerged.wRef);
      }
      if (this.wMerged.wHighlight) {
        this.convertToColor('highlight', last(this.wMerged.wHighlight));
      }
    }
  }

  private addRefStyling(wRef: WRef[]): void {
    this.element.classList.add(
      wRef.length > 1 ? 'w-ref-multi' : 'w-ref-single',
    );
  }

  private convertToColor(
    type: string,
    color: { color: Color } | undefined,
  ): void {
    let className: string = type;
    if (color) {
      switch (color.color) {
        case this.color.blue: {
          className = `${className}-blue`;
        }
        case this.color.yellow: {
          className = `${className}-yellow`;
        }
        case this.color.green: {
          className = `${className}-green`;
        }
        case this.color.red: {
          className = `${className}-red`;
        }
        case this.color.purple: {
          className = `${className}-purple`;
        }
        case this.color.orange: {
          className = `${className}-orange`;
        }
        case this.color.pink: {
          className = `${className}-pink`;
        }
        case this.color.gray: {
          className = `${className}-gray`;
        }
        case this.color.brown: {
          className = `${className}-brown`;
        }
        case this.color.darkBlue: {
          className = `${className}-dark-blue`;
        }
      }
      this.element.classList.add(className);
    }
  }
}
