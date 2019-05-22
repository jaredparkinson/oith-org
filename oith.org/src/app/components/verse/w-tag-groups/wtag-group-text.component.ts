import { Component, OnInit, Input } from '@angular/core';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';
import { WTagGroupText } from '../../../../../../oith.shared';

@Component({
  selector: 'app-wtag-group-text',
  template: `
    <app-w
      class="{{ this.getClassList() }}"
      *ngFor="let w of this.wTags"
      [w]="w"
    ></app-w>
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

  public getClassList(): string {
    return super.getClassList(this.wTagGroup);
  }
}
