import { Verse } from './models/Verse';
import { queryFormatGroups } from './functions/queryFormatGroups';
import { removeEmptySpaces } from './functions/removeEmptySpaces';
import { parseClassList, parseTextContent } from './run';

function getDataAid(element: Element): string {
  const dataAid = element.getAttribute('data-aid');

  if (dataAid) {
    return dataAid;
  } else {
    throw `Couldn't find data-aid in: ${element.outerHTML}`;
  }
}

export async function parseVerse(
  verseElement: Element,
): Promise<Verse> {
  const verse = new Verse();
  const formatGroups = await queryFormatGroups(verseElement);
  removeEmptySpaces(verseElement);
  verse.classList = await parseClassList(verseElement);
  verse.text = await parseTextContent(verseElement);
  verse.formatGroups = formatGroups ? formatGroups : [];
  // verse._id = `${chapterID}-${verseElement.id}`;
  verse._id = getDataAid(verseElement)
  verse.id = `${verseElement.id}`;
  return verse;
}
