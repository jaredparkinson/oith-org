import { FTagGroup } from './format_groups/FTagGroup';
import { F } from './format_tags/F';

export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public id: string;
  public FTagGroups: FTagGroup[] = [];
  public classList: string[] | undefined;
  public text: string;
  public wTags: F[] | undefined;
}
