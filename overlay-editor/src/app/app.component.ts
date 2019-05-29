import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public async ngOnInit(): Promise<void> {
    try {
      const noteFile = await axios.get('assets/eng-notes-mark.xml');
      const chapterFile = await axios.get('assets/1.html');
      this.dataService.loadNotesDocument(noteFile.data);
      this.dataService.loadChapterFile(chapterFile.data);
      console.log(noteFile);
      console.log(chapterFile);
    } catch (error) {}
  }
  public title = 'overlay-editor';

  public constructor(public dataService: DataService) {}

  public loadNotesFile(event: Event): void {
    const files = (event.srcElement as HTMLInputElement).files;

    if (files && ['text/xml', 'text/html'].includes(files[0].type)) {
      const reader = new FileReader();

      reader.onload = async (): Promise<void> => {
        // console.log(reader.result);
        await this.dataService.loadNotesDocument(reader.result as string);
      };
      reader.readAsText(files[0]);
    }
  }
  public loadChapterFile(event: Event): void {
    const files = (event.srcElement as HTMLInputElement).files;

    if (files && ['text/xml', 'text/html'].includes(files[0].type)) {
      const reader = new FileReader();

      reader.onload = async (): Promise<void> => {
        // console.log(reader.result);
        await this.dataService.loadChapterFile(reader.result as string);
      };
      reader.readAsText(files[0]);
    }
  }
}
