import { Component, OnInit, Input } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';
import { WTagGroupType, Verse } from '../../../../../oith.shared';
@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  public wGroupType = WTagGroupType;
  @Input() public verse: Verse;
  public constructor(public saveState: SaveStateService) {}

  public ngOnInit(): void {}
}
