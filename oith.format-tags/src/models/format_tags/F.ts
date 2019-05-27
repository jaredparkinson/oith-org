import { FType } from '../../enums/FType';

// public compressedOffsets: [number, number];
// public offsets: number[] | undefined;
export abstract class F {
  public offsets: number[];
  public compressedOffsets: [number, number][];
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

export class FormatTagLDSSource extends F {
  public bold: boolean;
  public italic: boolean;
  public underline: boolean;
  public doubleUnderline: boolean;
}
