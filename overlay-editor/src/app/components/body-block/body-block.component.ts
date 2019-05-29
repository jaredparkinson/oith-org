import { Component, OnInit, Input } from '@angular/core';
import { Verse, Note } from '../../../../../oith.shared';

@Component({
  selector: 'app-body-block',
  templateUrl: './body-block.component.html',
  styleUrls: ['./body-block.component.scss'],
})
export class BodyBlockComponent implements OnInit {
  @Input() public verses: Verse[];
  public constructor() {}

  public ngOnInit(): void {
    console.log(this.verses);
  }
}
