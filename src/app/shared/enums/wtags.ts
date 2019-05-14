export enum WTagGroupType {
  A = 0,
  Text = 1,
  Ruby = 2,
  ARuby = 3,
  RB = 4,
  RT = 5,
}

export interface W {
  charCount: [number, number][];
  charCountUncompressed: number[];
  optional: boolean | undefined;
  wType: WType;
  text: string | undefined;
  verseID: string;
}

export enum WType {
  Base = 0,
  RichText = 1,
  Highlight = 2,
  Underline = 3,
  Refs = 4,
  Poetry = 5,
  Link = 6,
  RubyRB = 7,
  RubyRT = 8,
}
export enum NoteType {
  New = 1,
  Eng = 2,
  TC = 3,
}

export class BaseW implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Base;
  public text: string;
}

export enum RichText {
  verseNumber = 0,

  clarityWord,
  translit,
  language,
  deityName,
  smallCaps,
  uppercase,
  entry,
  closing,
  signature,
  shortTitle,
  break,
  salutation,
  office,
  date,
  addressee,
  answer,
  question,
  line,
  paraMark,
  selah,
}
export enum Poetry {
  Poetry = 0,
  Prose = 1,
}

export enum Color {
  yellow,
  blue,
  green,
  red,
  purple,
  orange,
  pink,
  gray,
  brown,
  darkBlue,
}

export class WRef implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Refs;
  public text: string | undefined;
  public ref: string;
  public noteType: NoteType;
}

export class WRichText implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.RichText;
  public text: string | undefined;
  public richText: RichText;
}

export class WHighlight implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Highlight;
  public text: string | undefined;
  public color: Color;
}

export class WUnderline implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Underline;
  public text: string | undefined;
}

export class WPoetry implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType;
  public text: string | undefined;
  public poetry: Poetry;
}

export class WLink implements W {
  public charCountUncompressed: number[];
  public verseID: string;
  public charCount: [number, number][];
  public optional: boolean;
  public wType: WType = WType.Link;
  public text: string | undefined;
}

export class WMerged {
  public wRef: WRef[] | undefined = [];
  public wUnderline: WUnderline[] | undefined = [];
  public wHighlight: WHighlight[] | undefined = [];
  public wRichText: WRichText[] | undefined = [];
  public wPoetry: WPoetry | undefined;
  public characterCount: number[] = [];
  public text: string | undefined = undefined;
}

export interface WTagGroup {
  type: WTagGroupType;
  charCount: number[] | undefined;
  charCountCompress: [number, number];
}

export class WTagGroupA implements WTagGroup {
  public charCount: [number, number] | undefined;
  public charCountCompress: [number, number];
  public type: WTagGroupType = WTagGroupType.A;
  public wTags: W[];
  public href: string;
}
export class WTagGroupText implements WTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: WTagGroupType = WTagGroupType.Text;
  public wTags: W[];
}
export class WTagGroupRuby implements WTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: WTagGroupType = WTagGroupType.Ruby;
  public wRT: [number, number];
  public wRB: [number, number];
}

export class WTagGroupRubyA implements WTagGroup {
  public charCountCompress: [number, number];
  public charCount: [number, number] | undefined;
  public type: WTagGroupType = WTagGroupType.Ruby;
  public preRubyText: [number, number] | undefined;
  public postRubyText: [number, number] | undefined;
  public wRT: [number, number];
  public wRB: [number, number];
}
export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public wTagGroups: WTagGroup[];
  public classList: string[] | undefined;
  public text: string;
  public wTags: W[] | undefined;
}
