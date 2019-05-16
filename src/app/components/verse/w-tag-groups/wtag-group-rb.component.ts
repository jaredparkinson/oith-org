import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupA, Verse } from 'oith.wtags';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';

@Component({
  selector: 'app-wtag-group-rb',
  template: '',
  styles: [''],
})
export class WTagGroupRBComponent extends WTagComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;

  public constructor(public wTagService: WTagService) {
    super(wTagService);
  }

  public ngOnInit(): void {
    super.ngOnInit(this.wTagGroup);
    throw 'Not implemented';
  }
}
