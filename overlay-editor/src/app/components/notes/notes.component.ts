import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Note } from '../../../../../oith.shared';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @Input() public notes: Note[];
  public constructor(public dataService: DataService) {}

  public ngOnInit(): void {}
}
