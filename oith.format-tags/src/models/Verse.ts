import { F } from './F';
import { FTagGroup } from './FTagGroup';

export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public id: string;
  public FTagGroups: FTagGroup[] = [];
  public classList: string[] | undefined;
  public text: string;
  public wTags: F[] | undefined;
}
