import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../../oith.shared';
import { DataService } from '../../services/data.service';

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
