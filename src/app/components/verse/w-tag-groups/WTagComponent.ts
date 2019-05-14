import { Verse, WType, WTagGroup, WMerged } from 'src/app/shared/enums/wtags';
import { Input } from '@angular/core';
import { WTagService } from 'src/app/services/wtag.service';
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
}
