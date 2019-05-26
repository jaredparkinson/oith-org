import { FormatGroup } from './FormatGroup';

import { FTagGroupType } from '../../enums/FTagGroupType';
import { F } from '../format_tags/F';

export class FormatGroupRuby extends FormatGroup {
  public formatGroupType: FTagGroupType = FTagGroupType.Ruby;
  public formatGroupRT: FormatGroupRT;
  public formatGroupRB: FormatGroupRB;
}
export class FormatGroupRT extends FormatGroup {
  public formatGroupType: FTagGroupType = FTagGroupType.RT;
  public formatTags: F[];
}
export class FormatGroupRB extends FormatGroup {
  public formatGroupType: FTagGroupType = FTagGroupType.RB;
  public formatTags: F[];
}
