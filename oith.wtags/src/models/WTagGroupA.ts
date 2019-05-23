import { WTagGroup } from '../interfaces/WTagGroup';
import { WTagGroupType } from '../enums/WTagGroupType';
import { W } from '../interfaces/W';
export class WTagGroupA implements WTagGroup {
  public charCount: [number, number] | undefined;
  public charCountCompress: [number, number];
  public type: WTagGroupType = WTagGroupType.A;
  public wTags: W[];
  public href: string;
  public classList: string[] | undefined;
}
