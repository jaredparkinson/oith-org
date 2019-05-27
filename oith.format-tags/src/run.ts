import { Verse } from './models/Verse';
import { queryVerseElements, isChapter } from './functions/queryVerseElements';
// import { queryChildNodes } from './queryChildNodes';
import { normalizeCharacterCounts } from './functions/normalizeCharacterCounts';
import { verifyVerseFlatness } from './functions/verifyVerseFlatness';
import { parseVerse } from './parseVerse';

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
  // const language = await getLanguage(document);
  // const chapterID = await getID(document, language);

  if (await isChapter(document)) {
    await normalizeCharacterCounts(document);

    if (!(await verifyVerseFlatness(document))) {
      throw 'Document isn\'t flat';
    }

    const verseElements = (await queryVerseElements(document)).filter(
      (verseElement): boolean => {
        return !verseElement.classList.contains('page-break');
      },
    );
    console.log(verseElements);

    const versePromises = verseElements.map(
      async (verseElement): Promise<Verse | undefined> => {
        return await parseVerse(verseElement);
      },
    );

    const verses = (await Promise.all(versePromises)).filter(
      (verse): boolean => {
        return verse !== undefined;
      },
    ) as Verse[];
    console.log(verses);
    return verses;
  } else {
    return [];
  }
}
