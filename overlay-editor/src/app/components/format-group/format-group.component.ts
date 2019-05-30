import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith.format-tags/src/models/format_groups/FormatGroup';
import { FormatTagLDSSource } from '../../../../../oith.format-tags/src/models/format_tags/F';
import { parseOffset, parseOffsetNumbers } from 'src/app/services/parseOffset';
import { NoteLDSSource } from '../../../../../oith.notes/src/models/Note';
import { isEqual, last, first } from 'lodash';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';

@Component({
  selector: 'app-format-group',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
  @Input() public note: NoteLDSSource;
  @Input() public verse: LDSSourceVerse;

  @Input() public formatTags: FormatTagLDSSource[];
  public constructor() {}

  public ngOnInit(): void {}

  public getFormatTags(): FormatTagLDSSource[] {
    this.formatGroup.offsets = parseOffsetNumbers(
      this.formatGroup.compressedOffsets,
    );

    // if (
    //   this.note &&
    //   this.note.secondaryNotes &&
    //   this.note.secondaryNotes.filter(
    //     (sn): boolean => {
    //       return sn.notePhrase !== undefined && sn.notePhrase.includes('voice');
    //     },
    //   )
    // ) {
    //   console.log(this.note.secondaryNotes);
    // }
    if (this.formatGroup.offsets) {
      const newFormatTags: FormatTagLDSSource[] = [];
      let lastFormatTag: FormatTagLDSSource | undefined;

      this.formatGroup.offsets.map(
        (offset): void => {
          const newF = new FormatTagLDSSource();
          newF.offsets = [offset];
          newF.classList = [this.getOffsetClass(this.note, offset)];

          this.formatTags
            .filter(
              (u): boolean => {
                return u.offsets !== undefined && u.offsets.includes(offset);
              },
            )
            .map(
              (u): void => {
                newF.classList =
                  newF.classList && u.classList
                    ? newF.classList.concat(u.classList)
                    : newF.classList;
              },
            );

          if (!lastFormatTag) {
            lastFormatTag = newF;
          } else {
            if (
              newF.classList &&
              lastFormatTag.classList &&
              isEqual(newF.classList, lastFormatTag.classList)
            ) {
              (lastFormatTag.offsets as number[]).push(offset);
            } else {
              newFormatTags.push(lastFormatTag);
              lastFormatTag = newF;
            }
          }
        },
      );
      if (lastFormatTag) {
        newFormatTags.push(lastFormatTag);
      }

      newFormatTags.map(
        (f): void => {
          const fi = first(f.offsets);
          const l = last(f.offsets);
          f.text = this.verse.text.slice(fi, (l as number) + 1);
        },
      );
      return newFormatTags;
    }

    return [];
  }

  public getOffsetClass(note: NoteLDSSource, offset: number): string {
    if (note && note.secondaryNotes) {
      const length = note.secondaryNotes.filter(
        (secondaryNote): boolean => {
          return (
            secondaryNote.uncompressedOffsets !== undefined &&
            secondaryNote.uncompressedOffsets.includes(offset)
            // const f=
          );
        },
      ).length;

      return length > 1
        ? 'f-ref-multi'
        : length === 1
        ? 'f-ref-single'
        : 'no-underline';
    }
    return 'no-underline';
  }
  public getClassList(classList: string[] | undefined): string {
    return classList ? classList.toString().replace(/,/s, ' ') : '';
  }
}
