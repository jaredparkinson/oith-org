import { Paragraph } from './Paragraph';
export async function parseParagraphs(
  document: Document,
): Promise<Paragraph[]> {
  const paragraphSelectors = [
    '[lang="jpn"] .body-block',
    '[lang="rus"] .body-block',
    '[lang="tha"] .body-block',
    '[lang="ang"] .body-block',
    '[lang="swe"] .body-block',
    '[lang="deu"] .body-block',
    '[lang="fra"] .body-block',
    '[lang="spa"] .body-block',
    'html[data-uri*="/scriptures/gs"] body > header',
    'html[data-uri*="/scriptures/gs"] .body-block > p',
    'header ',
    '.body-block > p, nav > ul',
    ' .body-block > div',
    '.body-block > section > *',
  ];
  const paragraphPromises = Array.from(
    document.querySelectorAll(paragraphSelectors.toString()),
  ).map(
    async (paragraphElement): Promise<Paragraph> => {
      const paragraph = new Paragraph();
      const verseIDs = Array.from(
        paragraphElement.nodeName === 'UL'
          ? paragraphElement.querySelectorAll('li > *')
          : paragraphElement.children,
      )
        .map(
          (verseElement): string => {
            return verseElement.id;
          },
        )
        .filter(
          (verseID): boolean => {
            return verseID.trim() !== '';
          },
        );
      const classList = Array.from(paragraphElement.classList);
      const nodeName = `w-${paragraphElement.nodeName}`;
      paragraph.verseIds = verseIDs;
      paragraph.nodeName = nodeName.toLowerCase();
      paragraph.classList = classList.length > 0 ? classList : undefined;
      return paragraph;
    },
  );
  return await Promise.all(paragraphPromises);
}
