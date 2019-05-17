import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public constructor(public saveState: SaveStateService) {}

  public ngOnInit(): void {}
  public navigationPaneToggle(): void {
    this.saveState.data.navigationPaneToggle = !this.saveState.data
      .navigationPaneToggle;
  }
  public notesPaneToggle(): void {
    this.saveState.data.notesPaneToggle = !this.saveState.data.notesPaneToggle;
  }
  public paragraphsVisible(): void {
    this.saveState.data.paragraphsVisible = !this.saveState.data
      .paragraphsVisible;
  }
  public poetryVisible(): void {
    this.saveState.data.poetryVisible = !this.saveState.data.poetryVisible;
  }
  public secondaryNotesVisible(): void {
    this.saveState.data.secondaryNotesVisible = !this.saveState.data
      .secondaryNotesVisible;
  }
}
