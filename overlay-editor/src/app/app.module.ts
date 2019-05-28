import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BodyBlockComponent } from './components/body-block/body-block.component';
import { NotesComponent } from './components/notes/notes.component';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BodyBlockComponent,
    NotesComponent,
    FileLoaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
