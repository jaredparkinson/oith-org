import { W } from '../interfaces/W';
import { WTagGroup } from '../interfaces/WTagGroup';
import { WTagGroupType } from '../enums/WTagGroupType';
export class WTagGroupText implements WTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: WTagGroupType = WTagGroupType.Text;
  public wTags: W[];
  classList: string[] | undefined;
}
