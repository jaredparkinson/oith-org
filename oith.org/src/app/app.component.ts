import { Component } from '@angular/core';
import { SaveStateService } from './services/save-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'oith-org';
  public constructor(public saveStateService: SaveStateService) {}
}
