import { saveAs } from 'file-saver';
import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../../../../../oith.shared';
import { LDSSourceVerse } from '../../../../../oith.format-tags/src/models/Verse';
import { DataService } from 'src/app/services/data.service';
import { ReQueue } from 'src/app/services/ReQueue';

@Component({
  selector: 'app-body-block',
  templateUrl: './body-block.component.html',
  styleUrls: ['./body-block.component.scss'],
})
export class BodyBlockComponent implements OnInit {
  @Input() public verses: LDSSourceVerse[];
  public constructor(public dataService: DataService) {}

  public ngOnInit(): void {
    console.log(this.verses);
  }

  public addNoteTest(req: ReQueue): void {
    this.dataService.reQueueNotes(req);

    console.log('hhh');
  }

  public save(): void {
    if (this.dataService.notesDocument) {
      const notesDocument = new XMLSerializer().serializeToString(
        this.dataService.notesDocument,
      );
      const blob = new Blob([notesDocument], {
        type: 'text/html;charset=utf=8',
      });
      saveAs(blob, 'test.html');
      console.log(blob);
    }
  }
}
