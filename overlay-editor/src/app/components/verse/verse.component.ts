import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../../oith.shared';
import { Verse } from '../../../../../oith.format-tags/src/models/Verse';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public notes: Note[];
  @Input() public verse: Verse;
  public constructor() {}

  public ngOnInit() {}
}
