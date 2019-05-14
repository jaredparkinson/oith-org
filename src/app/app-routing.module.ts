import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChapterComponent } from './components/chapter/chapter.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  {
    path: 'search/:search/:pageNumber',
    component: SearchComponent,
  },
  {
    path: 'search/:search',
    component: SearchComponent,
  },
  {
    path: ':book/:chapter',
    component: ChapterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
