import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';
import axios from 'axios';
import { Verse } from 'src/app/shared/enums/wtags';
import { ChapterService } from 'src/app/services/chapter.service';
import { range } from 'lodash';
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
  ) {}

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      async (params): Promise<void> => {
        const chapterParams = this.paramService.parseChapterParams(params);
        console.log(chapterParams);

        const chapterData = await axios.get('assets/81.json');

        const verses = chapterData.data as Verse[];
        if (verses) {
          await this.chapterService.expandWTagCharacterCount(verses);
          console.log('test');

          this.chapterService.verses = verses;
        }
      },
    );
  }
}
