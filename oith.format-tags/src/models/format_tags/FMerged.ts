import { WRef } from './FRef';
import { WUnderline } from './FUnderline';
import { WHighlight } from './FHighlight';
import { FormatRichText } from './FRichText';
import { WPoetry } from './FPoetry';

export class WMerged {
  public wRef: WRef[] | undefined = [];
  public wUnderline: WUnderline[] | undefined = [];
  public wHighlight: WHighlight[] | undefined = [];
  public wRichText: FormatRichText[] | undefined = [];
  public wPoetry: WPoetry | undefined;
  public characterCount: number[] = [];
  public text: string | undefined = undefined;
  public classList: string[] | undefined;
}
