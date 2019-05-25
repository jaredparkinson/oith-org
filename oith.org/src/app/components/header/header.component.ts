import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';
import { RefService } from 'src/app/services/ref.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { TextSelectService } from 'src/app/services/text-select.service';

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
    public textSelectionService: TextSelectService,
    public modalService: NgbModal,
    private location: Location,
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
    this.textSelectionService.getSelection();
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
  public async open(content): Promise<void> {
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
    this.refService.resetChapterVisbility();
    this.saveState.save();
  }
  public async backClick(): Promise<void> {
    this.location.back();
  }
  public async forwardClick(): Promise<void> {
    this.location.forward();
  }

  public async showOrphanRefs(): Promise<void> {}
}
