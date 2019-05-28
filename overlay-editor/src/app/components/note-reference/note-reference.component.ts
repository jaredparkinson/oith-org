import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith.shared';

@Component({
  selector: 'app-note-reference',
  templateUrl: './note-reference.component.html',
  styleUrls: ['./note-reference.component.scss'],
})
export class NoteReferenceComponent implements OnInit {
  @Input() public noteRef: string;
  public constructor() {}

  public ngOnInit() {}
}
