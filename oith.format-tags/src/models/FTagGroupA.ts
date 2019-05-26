import { FTagGroupType } from '../enums/FTagGroupType';
import { F } from './F';
import { FTagGroup } from './FTagGroup';

export class FTagGroupA implements FTagGroup {
  public charCount: [number, number] | undefined;
  public charCountCompress: [number, number];
  public type: FTagGroupType = FTagGroupType.A;
  public wTags: F[];
  public href: string;
  public classList: string[] | undefined;
}
