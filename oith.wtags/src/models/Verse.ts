import { W } from '../interfaces/W';

import { WTagGroup } from '../interfaces/WTagGroup';
export class Verse {
  public _id: string;
  public _rev: string | undefined;
  public wTagGroups: WTagGroup[];
  public classList: string[] | undefined;
  public text: string;
  public wTags: W[] | undefined;
}
