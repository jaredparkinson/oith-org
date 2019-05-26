import { FTagGroupType } from '../../enums/FTagGroupType';

export abstract class FTagGroup {
  public type: FTagGroupType;
  public charCount: number[] | undefined;
  public charCountCompress: [number, number];
  public classList: string[] | undefined;
}
