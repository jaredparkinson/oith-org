import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupText } from 'oith.wtags';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';

@Component({
  selector: 'app-wtag-group-text',
  template: `
    <app-w *ngFor="let w of this.wTags" [w]="w"></app-w>
  `,
  styles: [''],
})
export class WTagGroupTextComponent extends WTagComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupText;

  public constructor(public wTagService: WTagService) {
    super(wTagService);
  }

  public ngOnInit(): void {
    // this.wTagService.buildWTags(this.verse, this.wTagGroup);
    super.ngOnInit(this.wTagGroup);
  }
}
