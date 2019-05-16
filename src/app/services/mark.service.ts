import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { uniq } from 'lodash';
import * as marked from 'marked';
import { RichTextEnum, RichText } from 'oith.wtags';
@Injectable({
  providedIn: 'root',
})
export class MarkService {
  private markdownIt = new MarkdownIt({
    html: true,
  });
  public constructor() {}

  public renderWTagMark(text: RichText[], wTagText: string): string {
    const markDownText = this.getCommonMark(text);

    let outputText = this.markdownIt.render(
      `${markDownText.preText}<w>${wTagText}</w>${markDownText.postText}`,
    );
    let markedOutput = marked(
      `${markDownText.preText}<w>${wTagText}</w>${markDownText.postText}`,
      { sanitize: false },
    );
    console.log(markedOutput);

    // const asdf =
    ['<w>', '</w>', '<p>', '</p>'].map(
      (replace): void => {
        outputText = outputText.replace(replace, '');
        markedOutput = markedOutput.replace(replace, '');
      },
    );
    console.log(markedOutput);

    return outputText;
    // return marked(`${markDownText.preText}${wTagText}${markDownText.postText}`);
    return this.markdownIt.render(
      `${markDownText.preText}<w>${wTagText}</w>${markDownText.postText}`,
    );
  }

  private getCommonMark(
    text: RichText[],
  ): { preText: string; postText: string } {
    const commonMark: { preText: string; postText: string } = {
      preText: '',
      postText: '',
    };
    uniq(text).map(
      (rich): void => {
        let addedText = '';
        switch (rich) {
          case RichTextEnum.verseNumber: {
            addedText = '**';
          }
        }
        commonMark.preText = `[${addedText}${commonMark.preText}`;
        commonMark.postText = `${commonMark.postText}${addedText}](asdf.html)`;
      },
    );

    return commonMark;
  }
}
