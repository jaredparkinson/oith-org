import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';
import { RefService } from 'src/app/services/ref.service';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public constructor(
    public saveState: SaveStateService,
    public refService: RefService,
    public chapterServicd: ChapterService,
  ) {}

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
    this.saveState.data.newNotesVisible = !this.saveState.data.newNotesVisible;
    this.saveState.data.translatorNotesVisible = !this.saveState.data
      .translatorNotesVisible;
    this.saveState.data.englishNotesVisible = !this.saveState.data
      .englishNotesVisible;
    if (this.chapterServicd.chapter.notes) {
      this.saveState.data.refLabelSettings.map(h => {
        h.visible = !h.visible;
      });
      this.refService.resetNetNoteResfVisibility();
      this.refService.initRefVisibility(this.chapterServicd.chapter.notes);
    }
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
