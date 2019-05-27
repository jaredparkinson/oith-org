import { FormatGroup } from './format_groups/FormatGroup';
import { F } from './format_tags/F';
export const enum NodeName {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
}

export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public id: string;
  public formatGroups: FormatGroup[] = [];
  public classList: string[] | undefined;
  public text: string;
  public formatTags: F[] | undefined;
  public nodeName: NodeName;
}

export class LDSSourceVerse extends Verse {
  public nodeName: NodeName = NodeName.p;
}
