import { Component, OnInit, Input } from '@angular/core';
import { Paragraph } from '../../../../../oith.shared';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
  @Input() public paragraph: Paragraph;
  public constructor() {}

  public ngOnInit(): void {}
}
