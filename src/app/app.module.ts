import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  APP_INITIALIZER,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { VerseComponent } from './components/verse/verse.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { WComponent } from './components/w/w.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyBlockComponent } from './components/body-block/body-block.component';
import { NoteComponent } from './components/note/note.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AWComponent } from './components/w/aw-tag.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WTagGroupRTComponent } from './components/verse/w-tag-groups/wtag-group-rt.component';
import { WTagGroupAComponent } from './components/verse/w-tag-groups/wtag-group-a.component';
import { WTagGroupRubyComponent } from './components/verse/w-tag-groups/wtag-group-ruby.component';
import { WTagGroupTextComponent } from './components/verse/w-tag-groups/wtag-group-text.component';
import { WTagGroupRBComponent } from './components/verse/w-tag-groups/wtag-group-rb.component';
import { WTagGroupARubyComponent } from './components/verse/w-tag-groups/wtag-group-aruby.component';
import { WTagDirective } from './directives/wtag.directive';
import { SecondaryNoteComponent } from './components/note/secondary-note-component';
import { NotePhraseComponent } from './components/note/note-phrase-component';
import { NoteRefComponent } from './components/note/note-ref-component';
import { SaveStateService } from './services/save-state.service';

export function load(saveState: SaveStateService) {
  return async (): Promise<void> => {
    await saveState.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ChapterComponent,
    VerseComponent,
    ParagraphComponent,
    WComponent,
    HeaderComponent,
    FooterComponent,
    AWComponent,
    BodyBlockComponent,
    NoteComponent,
    NavigationComponent,
    SearchComponent,
    SettingsComponent,
    SecondaryNoteComponent,
    NotePhraseComponent,
    NoteRefComponent,
    WTagGroupAComponent,
    WTagGroupRubyComponent,
    WTagGroupTextComponent,
    WTagGroupRBComponent,
    WTagGroupRTComponent,
    WTagGroupARubyComponent,
    WTagDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [SaveStateService],
      multi: true,
    },
    SaveStateService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
