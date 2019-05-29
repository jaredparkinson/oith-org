import { Component, OnInit, Input } from '@angular/core';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public verse: LDSSourceVerse;
  public constructor() {}

  public ngOnInit(): void {
    // console.log(this.verse.formatTags);
  }
}
