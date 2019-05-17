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
  public async navigationPaneToggle(): Promise<void> {
    this.saveState.data.navigationPaneToggle = !this.saveState.data
      .navigationPaneToggle;
    await this.saveState.save();
  }
  public async notesPaneToggle(): Promise<void> {
    this.saveState.data.notesPaneToggle = !this.saveState.data.notesPaneToggle;
    await this.saveState.save();
  }
  public async paragraphsVisible(): Promise<void> {
    this.saveState.data.paragraphsVisible = !this.saveState.data
      .paragraphsVisible;
    await this.saveState.save();
  }
  public async poetryVisible(): Promise<void> {
    this.saveState.data.poetryVisible = !this.saveState.data.poetryVisible;
    await this.saveState.save();
  }
  public async secondaryNotesVisible(): Promise<void> {
    this.saveState.data.secondaryNotesVisible = !this.saveState.data
      .secondaryNotesVisible;
    await this.saveState.save();
  }
}
