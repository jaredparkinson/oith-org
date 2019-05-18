import * as MarkdownIt from 'markdown-it';

export class PreMarkdown {
  public a: boolean | undefined;
  private markdownIt = new MarkdownIt({
    html: true,
  });
  public bold: boolean | undefined;
  public italic: boolean | undefined;
  public href: string | undefined;
  public text: string | undefined;
  /**
   * getMarkdown
   */
  public getMarkdown(): string {
    if (this.text) {
      this.addMarkdown(true, '<F>', '</F>');
      this.addMarkdown(
        this.a !== undefined && this.href !== undefined,
        `[${this.href}](`,
        ')',
      );
      this.addMarkdown(this.italic, '*');
      this.addMarkdown(this.bold, '**');

      this.text = this.markdownIt.render(this.text);
      // const asdf =
      ['<w>', '</w>', '<p>', '</p>'].map(
        (replace): void => {
          if (this.text) {
            this.text = this.text.replace(replace, '');
          }
        },
      );
      return this.text;
    }
    return '';
  }
  private addMarkdown(
    type: boolean | undefined,
    md: string,
    mdend?: string | undefined,
  ): void {
    if (type && mdend) {
      this.text = `${md}${this.text}${mdend}`;
    }
    if (type && !mdend) {
      this.text = `${md}${this.text}${md}`;
    }
  }
}
