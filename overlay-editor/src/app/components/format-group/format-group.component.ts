import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith.format-tags/src/models/format_groups/FormatGroup';

@Component({
  selector: 'app-format-group',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
  public constructor() {}

  public ngOnInit(): void {}
}
