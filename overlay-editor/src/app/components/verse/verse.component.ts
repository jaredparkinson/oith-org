import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../../../../../oith.shared';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public verse: Verse;
  constructor() {}

  ngOnInit() {}
}
