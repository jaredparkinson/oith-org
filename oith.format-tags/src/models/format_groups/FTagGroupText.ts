import { FTagGroup } from './FTagGroup';
import { FTagGroupType } from '../../enums/FTagGroupType';
import { F } from '../format_tags/F';

export class FTagGroupText implements FTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: FTagGroupType = FTagGroupType.Text;
  public wTags: F[];
  public classList: string[] | undefined;
}
