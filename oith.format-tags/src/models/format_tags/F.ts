import { FType } from '../../enums/FType';

export abstract class F {
  public charCount: [number, number][];
  public charCountUncompressed: number[];
  public optional: boolean | undefined;
  public FType: FType;
  public text: string | undefined;
  public verseID: string;
  public visible: boolean | undefined;
  public classList: string[] | undefined;
}

export class FormatTagTemp extends F {
  public FType = FType.Temp;
}
