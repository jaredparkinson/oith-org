import { Component, OnInit, Input } from '@angular/core';
import { NotePhrase } from '../../../../../oith.shared';

@Component({
  selector: 'app-note-phrase',
  templateUrl: './note-phrase.component.html',
  styleUrls: ['./note-phrase.component.scss'],
})
export class NotePhraseComponent implements OnInit {
  @Input() public notePhrase: NotePhrase;

  public constructor() {}

  public ngOnInit() {}
}
