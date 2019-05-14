import { Component, OnInit, Input } from '@angular/core';
import { Verse, WTagGroupType } from 'src/app/shared/enums/wtags';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  public wGroupType = WTagGroupType;
  @Input() public verse: Verse;
  public constructor() {}

  public ngOnInit(): void {}
}
