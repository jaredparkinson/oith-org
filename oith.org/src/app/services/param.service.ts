import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ParamService {
  public constructor() {}

  public parseChapterParams(
    params: Params,
  ): {
    book: string;
    chapter: string;
    highlight: string | undefined;
    context: string | undefined;
  } {
    const book = params['book'] as string;
    const chapter = params['chapter'] as string;
    return {
      book: book,
      chapter: chapter,
      highlight: undefined,
      context: undefined,
    };
  }
}
