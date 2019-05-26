import { Verse } from './models/Verse';
import { queryVerseElements } from './functions/queryVerseElements';
// import { queryChildNodes } from './queryChildNodes';
import { normalizeCharacterCounts } from './normalizeCharacterCounts';
import { verifyVerseFlatness } from './functions/verifyVerseFlatness';
// import { queryChildNodes } from './queryChildNodes';
import { queryFormatGroups } from './queryFormatGroups';
import { getID, getLanguage } from '../../oith.shared';

export async function parseTextContent(
  element: Element | Node,
): Promise<string> {
  return element.textContent ? element.textContent : '';
}

export async function parseClassList(
  element: Element,
): Promise<string[] | undefined> {
  return element.classList
    ? (Array.from(element.classList) as string[])
    : undefined;
}

export async function run(document: Document): Promise<Verse[]> {
  const language = await getLanguage(document);
  const chapterID = await getID(document, language);
  await normalizeCharacterCounts(document);

  if (!(await verifyVerseFlatness(document))) {
    throw 'Document isn\'t flat';
  }

  const verseElements = await queryVerseElements(document);
  console.log(verseElements);

  const asdf = verseElements.map(
    async (verseElement): Promise<Verse> => {
      const verse = new Verse();
      const formatGroups = await queryFormatGroups(verseElement);

      document.querySelectorAll(['br', '.page-break'].toString()).forEach(
        (e): void => {
          e.remove();
        },
      );

      verse.classList = await parseClassList(verseElement);
      verse.text = await parseTextContent(verseElement);
      verse.formatGroups = formatGroups ? formatGroups : [];
      verse._id = `${chapterID}-${verseElement.id}`;
      verse.id = `${verseElement.id}`;
      return verse;
    },
  );
  console.log(await Promise.all(asdf));

  return [];
}
