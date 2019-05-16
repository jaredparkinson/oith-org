import { WType } from '../enums/WType';

export interface W {
  charCount: [number, number][];
  charCountUncompressed: number[];
  optional: boolean | undefined;
  wType: WType;
  text: string | undefined;
  verseID: string;
}
