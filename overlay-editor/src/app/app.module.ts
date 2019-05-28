import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BodyBlockComponent } from './components/body-block/body-block.component';
import { NotesComponent } from './components/notes/notes.component';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';
import { SecondaryNoteComponent } from './components/secondary-note/secondary-note.component';
import { NoteTitleComponent } from './components/note-title/note-title.component';
import { NotePhraseComponent } from './components/note-phrase/note-phrase.component';
import { NoteReferenceComponent } from './components/note-reference/note-reference.component';
import { DataService } from './services/data.service';
import { VerseComponent } from './components/verse/verse.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BodyBlockComponent,
    NotesComponent,
    FileLoaderComponent,
    SecondaryNoteComponent,
    NoteTitleComponent,
    NotePhraseComponent,
    NoteReferenceComponent,
    VerseComponent,
  ],
  imports: [BrowserModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
