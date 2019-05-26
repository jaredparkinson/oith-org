import { FormatGroup } from './format_groups/FormatGroup';
import { F } from './format_tags/F';

export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public id: string;
  public formatGroups: FormatGroup[] = [];
  public classList: string[] | undefined;
  public text: string;
  public formatTags: F[] | undefined;
}
