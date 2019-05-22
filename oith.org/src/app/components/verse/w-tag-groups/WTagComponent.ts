import { Verse, WType, WMerged } from 'oith.wtags';
import { Input } from '@angular/core';
import { WTagService } from 'src/app/services/wtag.service';
import { WTagGroup } from 'oith.wtags/src/interfaces/WTagGroup';
export abstract class WTagComponent {
  @Input() public verse: Verse;
  public wTags: WMerged[] | undefined;
  public wTagTypes = WType;

  public constructor(public wTagService: WTagService) {}

  public ngOnInit(wTagGroup: WTagGroup): void {
    this.wTags = this.wTagService.buildWTags(this.verse, wTagGroup);
    if (this.wTags.length === 0) {
      console.log(this.wTags);
    }
  }
  public getClassList(wTagGroup: WTagGroup): string {
    return wTagGroup.classList
      ? wTagGroup.classList.toString().replace(',', ' ')
      : '';
  }
}
