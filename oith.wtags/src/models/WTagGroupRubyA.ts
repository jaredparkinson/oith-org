import { WTagGroup } from '../interfaces/WTagGroup';
import { WTagGroupType } from '../enums/WTagGroupType';
export class WTagGroupRubyA implements WTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: WTagGroupType = WTagGroupType.Ruby;
  public preRubyText: [number, number] | undefined;
  public postRubyText: [number, number] | undefined;
  public wRT: [number, number];
  public wRB: [number, number];
  classList: string[] | undefined;
}
