import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'overlay-editor';

  public constructor(public dataService: DataService) {}

  public loadNotesFile(event: Event): void {
    const files = (event.srcElement as HTMLInputElement).files;

    if (files && ['text/xml', 'text/html'].includes(files[0].type)) {
      const reader = new FileReader();

      reader.onload = (): void => {
        // console.log(reader.result);
        this.dataService.loadNotesDocument(reader.result as string);
      };
      reader.readAsText(files[0]);
    }
  }
  public loadChapterFile(event: Event): void {
    const files = (event.srcElement as HTMLInputElement).files;

    if (files && ['text/xml', 'text/html'].includes(files[0].type)) {
      const reader = new FileReader();

      reader.onload = (): void => {
        // console.log(reader.result);
        this.dataService.loadChapterFile(reader.result as string);
      };
      reader.readAsText(files[0]);
    }
  }
}
