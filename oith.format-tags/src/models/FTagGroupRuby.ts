import { FTagGroup } from './FTagGroup';

import { FTagGroupType } from '../enums/FTagGroupType';

export class FTagGroupRuby implements FTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: FTagGroupType = FTagGroupType.Ruby;
  public wRT: [number, number];
  public wRB: [number, number];
  public classList: string[] | undefined;
}
