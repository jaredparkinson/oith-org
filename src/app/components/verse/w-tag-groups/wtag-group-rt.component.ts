import { Component, OnInit, Input } from '@angular/core';
import { WTagGroupA, Verse } from 'src/app/shared/enums/wtags';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagComponent } from './WTagComponent';

@Component({
  selector: 'app-wtag-group-rt',
  template: '',
  styles: [''],
})
export class WTagGroupRTComponent extends WTagComponent implements OnInit {
  @Input() public wTagGroup: WTagGroupA;

  public constructor(public wTagService: WTagService) {
    super();
  }

  public ngOnInit(): void {
    throw 'Not implemented';
  }
}
