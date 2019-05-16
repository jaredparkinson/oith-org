import { WTagGroupType } from '../enums/WTagGroupType';

export interface WTagGroup {
  type: WTagGroupType;
  charCount: number[] | undefined;
  charCountCompress: [number, number];
}
