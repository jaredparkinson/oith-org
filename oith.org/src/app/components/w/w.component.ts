import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import {
  WMerged,
  RichText,
  RichTextEnum,
  WRef,
  Verse,
} from '../../../../../oith.shared';
import { multiIncludes } from './multiIncludes';
import { MarkService } from 'src/app/services/mark.service';
import { PreMarkdown } from './PreMarkdown';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SaveStateService } from 'src/app/services/save-state.service';
import { RefService } from 'src/app/services/ref.service';
import { first, last } from 'lodash';

@Component({
  selector: 'app-w',
  templateUrl: './w.component.html',
  styleUrls: ['./w.component.scss'],
})
export class WComponent implements OnInit {
  @Input() public w: WMerged;
  @Input() public verse: Verse;

  public ref = false;

  public fTagClickList: WRef[] | undefined;

  public constructor(
    public markService: MarkService,
    public domSanitizer: DomSanitizer,
    public saveStateService: SaveStateService,
    public refService: RefService,
  ) {}
  public ngOnInit(): void {
    if (this.w.wRef) {
      this.ref = true;
    }
  }

  public getCharacterCount(): [number, number] {
    const f = first(this.w.characterCount);
    const l = last(this.w.characterCount);

    if (f && l) {
      return [f, l];
    }
    return [-1, -1];
  }
  public getClassList(): string {
    const classList: string[] = [];

    // console.log(this.w.wRef ? this.w.wRef : 0);
    if (this.saveStateService.data.underLineRefs && this.w.wRef) {
      const count = this.w.wRef.filter(
        (wRef): boolean => {
          return wRef.visible === true;
        },
      ).length;
      if (count === 1) {
        classList.push('f-ref-single');
      } else if (count > 1) {
        classList.push('f-ref-multi');
      }
      if (
        this.refService.ftagIsSelected(
          this.w.wRef.map(
            (wref): string => {
              return wref.ref;
            },
          ),
        )
      ) {
        classList.push('selected');
      }
    }
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

  public getMarkDown(): SafeHtml {
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

    return this.domSanitizer.bypassSecurityTrustHtml(preMarkDown.getMarkdown());
    return preMarkDown.getMarkdown();
  }

  public click(): void {
    if (this.w.wRef) {
      if (!this.fTagClickList) {
        this.setFTagClickList();
      }
      if (this.fTagClickList && this.fTagClickList.length > 0) {
        const id = this.fTagClickList.shift();
        if (id) {
          this.refService.resetNoteHighlight(id.ref);

          const secondaryNote = document.getElementById(`${id.ref}`);
          if (secondaryNote) {
            secondaryNote.scrollIntoView();
          }
        } else {
          this.fTagClickList = undefined;
        }
      } else {
        this.refService.resetNoteHighlight('');
        this.fTagClickList = undefined;
      }
    }
  }

  private setFTagClickList(): void {
    if (this.w.wRef) {
      this.fTagClickList = this.w.wRef.filter(
        (wRef): boolean => {
          return wRef.visible === true;
        },
      );
    }
  }
}
