import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupA, Verse } from 'src/app/shared/enums/wtags';
import { WTagService } from 'src/app/services/wtag.service';

@Component({
  selector: 'app-wtag-group-text',
  template: `
    {{
      this.verse.text.slice(
        this.wTagGroup.charCountCompress[0],
        this.wTagGroup.charCountCompress[1] + 1
      )
    }}
  `,
  styles: [''],
})
export class WTagGroupTextComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;
  @Input() public verse: Verse;

  public constructor(public wTagService: WTagService) {}

  public ngOnInit(): void {}
}
