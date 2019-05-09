import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { VerseComponent } from './components/verse/verse.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { WComponent } from './components/w/w.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyBlockComponent } from './components/body-block/body-block.component';
import { NoteComponent } from './components/note/note.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ChapterComponent,
    VerseComponent,
    ParagraphComponent,
    WComponent,
    HeaderComponent,
    SettingsComponent,
    FooterComponent,
    BodyBlockComponent,
    NoteComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
