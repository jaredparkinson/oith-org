import { Verse } from './models/Verse';
import { queryVerseElements } from './functions/queryVerseElements';
// import { queryChildNodes } from './queryChildNodes';
import { normalizeCharacterCounts } from './normalizeCharacterCounts';
import { verifyVerseFlatness } from './functions/verifyVerseFlatness';
import { queryChildNodes } from './queryChildNodes';
import { FormatGroup } from './models/format_groups/FormatGroup';
import { hasSingleFormatGroup } from './functions/hasSingleFormatGroup';
import { FormatGroupText } from './models/format_groups/FormatGroupText';

export async function queryFormatGroups(
  verseElement: Element,
): Promise<FormatGroup[] | undefined> {
  const formatGroups: FormatGroup[] = [];
  if (await hasSingleFormatGroup(verseElement)) {
    const formatGroup = new FormatGroupText();
    formatGroups.push(formatGroup);
  } else {
  }
  return formatGroups.length > 0 ? formatGroups : undefined;
}

export async function run(document: Document): Promise<Verse[]> {
  await normalizeCharacterCounts(document);

  if (!(await verifyVerseFlatness(document))) {
    throw 'Document isn\'t flat';
  }

  const asdf = (await queryVerseElements(document)).map(
    async (verseElement): Promise<string[]> => {
      return (await queryChildNodes(verseElement)).map(
        (childNode): string => {
          return childNode.nodeName;
        },
      );

      // (await queryChildNodes(verseElement)).map((childNode): void => {
      //   console.log(`${verseElement.id} - ${childNode.nodeName}`);
      // });
    },
  );

  console.log(await Promise.all(asdf));

  // console.log(verseElements);
  return [];
}
