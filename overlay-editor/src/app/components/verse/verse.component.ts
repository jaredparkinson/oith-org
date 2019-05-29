import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../../oith.shared';
import {
  Verse,
  LDSSourceVerse,
} from '../../../../../oith.format-tags/src/models/Verse';
import { NoteLDSSource } from '../../../../../oith.notes/src/models/Note';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public verse: LDSSourceVerse;
  public constructor() {}

  public ngOnInit(): void {}
}
