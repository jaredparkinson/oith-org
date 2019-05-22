import { Component, OnInit, Input } from '@angular/core';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';
import { WTagGroupA } from '../../../../../../oith.shared';

@Component({
  selector: 'app-wtag-group-rt',
  template: '',
  styles: [''],
})
export class WTagGroupRTComponent extends WTagComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;

  public constructor(public wTagService: WTagService) {
    super(wTagService);
  }

  public ngOnInit(): void {
    throw 'Not implemented';
  }
  public getClassList(): string {
    return super.getClassList(this.wTagGroup);
  }
}
