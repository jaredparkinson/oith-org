import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';
import axios from 'axios';
import { Verse } from 'oith.wtags';
import {
  ChapterService,
  urlToIDs as urlToChapterId,
} from 'src/app/services/chapter.service';
import { Note } from '../../../../oith.notes/src/models/Note';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  public constructor(
    public activatedRoute: ActivatedRoute,
    public paramService: ParamService,
    public chapterService: ChapterService,
    public router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      async (params): Promise<void> => {
        // const chapterParams = this.paramService.parseChapterParams(params);
        // console.log(chapterParams);
        // const ids = await urlToChapterId(chapterParams, 'eng');

        // console.log(ids);

        // const chapterData = await axios.get(
        //   `assets/scripture_files/${ids}-wtags.json`,
        // );
        // const noteData = await axios.get(
        //   `assets/scripture_files/${ids}-notes.json`,
        // );
        // const verses = chapterData.data as Verse[];
        // const notes = noteData.data as Note[];
        // if (verses) {
        //   await this.chapterService.expandWTagCharacterCount(verses);
        //   console.log('test');

        //   this.chapterService.verses = verses;
        //   this.chapterService.notes = notes;
        // }
        try {
          await this.chapterService.queryChapter(params);
        } catch (error) {
          this.router.navigateByUrl('');
        }
      },
    );
  }
}
