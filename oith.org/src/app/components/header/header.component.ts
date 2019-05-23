import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';
import { RefService } from 'src/app/services/ref.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

    public modalService: NgbModal,
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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async open(content) {
    await this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    }).result;
  }
  public refLabelClick(ref: { visible: boolean } | string): void {
    if ((ref as { visible: boolean }).visible !== undefined) {
      (ref as { visible: boolean }).visible = !(ref as { visible: boolean })
        .visible;
      console.log(ref);
    } else {
      this.saveState.data[ref as string] = !this.saveState.data[ref as string];
    }
    this.refService.resetSecondaryNotesVisibility();
    this.saveState.save();
    // this.refService.resetNetNoteResfVisibility();
  }
}
