import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public constructor(public saveStateService: SaveStateService) {}

  public ngOnInit() {}
}
