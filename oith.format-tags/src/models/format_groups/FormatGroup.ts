import { FTagGroupType } from '../../enums/FTagGroupType';

export abstract class FormatGroup {
  public formatGroupType: FTagGroupType;
  public compressedOffsets: [number, number];
  public offsets: [number, number] | undefined;
  public classList: string[] | undefined;
}
