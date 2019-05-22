import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupA } from 'oith.wtags';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';

@Component({
  selector: 'app-wtag-group-a',
  template: `
    <a [href]="this.wTagGroup.href" class="{{ this.getClassList() }}">
      <app-w *ngFor="let w of this.wTags" [w]="w"></app-w>
    </a>
  `,
  styles: [''],
})
export class WTagGroupAComponent extends WTagComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;

  public constructor(public wTagService: WTagService) {
    super(wTagService);
  }

  public ngOnInit(): void {
    super.ngOnInit(this.wTagGroup);
    // this.wTagService.buildWTags(this.verse, this.wTagGroup);
  }
  public getClassList(): string {
    return super.getClassList(this.wTagGroup);
  }
}
