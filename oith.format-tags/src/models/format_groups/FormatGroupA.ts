import { FormatGroup } from './FormatGroup';
import { FTagGroupType } from '../../enums/FTagGroupType';

export class FormatGroupA extends FormatGroup {
  public formatGroupType: FTagGroupType = FTagGroupType.A;
  public href: string;
}
