import { FormatGroup } from './FormatGroup';
import { FTagGroupType } from '../../enums/FTagGroupType';
import { FormatGroupRuby } from './FormatGroupRuby';

export class FormatGroupRubyA extends FormatGroup {
  public formatGroupType: FTagGroupType = FTagGroupType.ARuby;
  public formatGroupRuby: FormatGroupRuby;
}
