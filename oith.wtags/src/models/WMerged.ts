import { WRef } from './WRef';
import { WRichText } from './WRichText';
import { WHighlight } from './WHighlight';
import { WUnderline } from './WUnderline';
import { WPoetry } from './WPoetry';
export class WMerged {
  public wRef: WRef[] | undefined = [];
  public wUnderline: WUnderline[] | undefined = [];
  public wHighlight: WHighlight[] | undefined = [];
  public wRichText: WRichText[] | undefined = [];
  public wPoetry: WPoetry | undefined;
  public characterCount: number[] = [];
  public text: string | undefined = undefined;
  public classList: string[] | undefined;
}
