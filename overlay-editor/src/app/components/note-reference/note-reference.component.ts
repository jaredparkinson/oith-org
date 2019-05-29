import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith.shared';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-note-reference',
  templateUrl: './note-reference.component.html',
  styleUrls: ['./note-reference.component.scss'],
})
export class NoteReferenceComponent implements OnInit {
  @Input() public noteRef: string;
  public constructor(public sanitizer: DomSanitizer) {}

  public ngOnInit(): void {}

  public noteRefAsSafeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.noteRef);
  }
}
