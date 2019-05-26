import { FTagGroup } from './FTagGroup';
import { FTagGroupType } from '../../enums/FTagGroupType';
import { F } from '../format_tags/F';

export class FTagGroupA implements FTagGroup {
  public charCount: [number, number] | undefined;
  public charCountCompress: [number, number];
  public type: FTagGroupType = FTagGroupType.A;
  public wTags: F[];
  public href: string;
  public classList: string[] | undefined;
}
