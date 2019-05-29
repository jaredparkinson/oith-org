import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith.format-tags/src/models/format_groups/FormatGroup';
import { Note } from '../../../../../oith.shared';
import { FormatTagLDSSource } from '../../../../../oith.format-tags/src/models/format_tags/F';

@Component({
  selector: 'app-format-group',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
  @Input() public note: Note;

  public constructor() {}

  public ngOnInit(): void {}

  public getFormatTags(): FormatTagLDSSource[] {
    return [];
  }
}
