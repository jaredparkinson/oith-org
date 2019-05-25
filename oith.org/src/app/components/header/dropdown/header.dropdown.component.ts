import { Component, OnInit } from '@angular/core';
import { SaveStateService } from 'src/app/services/save-state.service';
import { RefService } from 'src/app/services/ref.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { TextSelectService } from 'src/app/services/text-select.service';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header.dropdown.component.html',
  styleUrls: ['./header.dropdown.component.scss'],
})
export class HeaderDropdownComponent implements OnInit {
  public showOrphanNotes: boolean = false;
  public constructor(
    public saveState: SaveStateService,
    public refService: RefService,
    public chapterService: ChapterService,
    public textSelectionService: TextSelectService,
    public modalService: NgbModal,
    private location: Location,
  ) {}

  public ngOnInit(): void {}

  public async showNotes(): Promise<void> {
    this.showOrphanNotes = false;
    this.refService.resetChapterVisbility();
  }
  public async showOrphanRefs(): Promise<void> {
    const fRefs = await this.refService.getWRefList();
    if (fRefs) {
      this.showOrphanNotes = true;
      await this.refService.setListOfNotesVisibility(fRefs, false);
      // fRefs.map((fRefs): void => {});
      console.log(Array.from(this.refService.noteVis.values()));
    }
    // +console.log(fRefs);
  }
}
