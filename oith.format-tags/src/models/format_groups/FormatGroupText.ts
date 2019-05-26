import { FormatGroup } from './FormatGroup';
import { FTagGroupType as FormatGroupType } from '../../enums/FTagGroupType';

export class FormatGroupText extends FormatGroup {
  public formatGroupType = FormatGroupType.Text;
}
export class FormatGroupBR extends FormatGroup {
  public formatGroupType = FormatGroupType.BR;
  public offsets = undefined;
  public classList = undefined;
}
export class FormatGroupPageBreak extends FormatGroup {
  public formatGroupType = FormatGroupType.BR;
  public offsets = undefined;
  public classList = ['page-break'];
}
