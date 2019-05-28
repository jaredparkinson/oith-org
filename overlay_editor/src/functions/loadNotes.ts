let noteDocument: Document | undefined;

export class Navigation {
  public text: string | undefined | null;
  public href: string | undefined;
}

export let navigation: Navigation[] = [];

export async function loadNotes(file: string): Promise<void> {
  const domParser = new DOMParser();

  noteDocument = domParser.parseFromString(file, 'text/html');
  console.log(noteDocument.querySelectorAll('body > ul > li > p > a'));
  Array.from(noteDocument.querySelectorAll('body > ul > li > p > a')).map(
    (a: HTMLAnchorElement): void => {
      const nav: Navigation = {
        text: a.textContent,
        href: a.href,
      };
      if (nav.text && nav.href) {
        navigation.push(nav);
      }
    },
  );
  console.log(navigation);
}
