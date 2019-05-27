import { Verse } from '../models/Verse';
import { queryVerseElements } from './queryVerseElements';
import { normalizeCharacterCounts } from './normalizeCharacterCounts';
import { verifyVerseFlatness } from './verifyVerseFlatness';
import { queryFormatGroups } from './queryFormatGroups';
import { removeEmptySpaces } from './removeEmptySpaces';
import { parseClassList, parseTextContent } from '../run';
import { F, FormatTagTemp } from '../models/format_tags/F';
import { queryChildNodes } from './queryChildNodes';

import { isEqual } from 'lodash';
// import { getID, getLanguage } from '../../../oith.shared/src/functions';

function verifyChildNodesNotEmpty(childNodes: Node[]): boolean {
  return !childNodes
    .map(
      (childNode): boolean => {
        if (childNode.textContent && childNode.textContent.length > 0) {
          return true;
        }
        return false;
      },
    )
    .includes(false);
}

function isTextNode(node: Node): boolean {
  if (node.nodeName === '#text') {
    return true;
  }

  const classList = (node as Element).classList;

  if (!classList || classList.length === 0) {
    return true;
  }
  return false;
}
function generateFormatBaseTags(
  node: Node,
  formatTags: F[],
  classList: string[],
): void {
  // console.log(`${node.nodeName} ${await isTextNode(node)}`);

  if (isTextNode(node)) {
    if (node.textContent) {
      node.textContent.split('').map(
        (character): void => {
          const f = new FormatTagTemp();

          f.text = character;
          f.classList = classList;
          formatTags.push(f);
        },
      );
    }
  } else {
    let newClassList: string[] = [];
    newClassList = newClassList.concat(classList);
    if ((node as Element).classList !== undefined) {
      newClassList = newClassList.concat(
        Array.from((node as Element).classList),
      );
    }

    Array.from(node.childNodes).map(
      (childNode): void => {
        generateFormatBaseTags(childNode, formatTags, newClassList);
      },
    );
  }
}

function formatTempTagsAreEqual(f1: FormatTagTemp, f2: FormatTagTemp): boolean {
  if (f1.classList === undefined && f2.classList == undefined) {
    return true;
  } else if (f1.classList !== undefined && f2.classList !== undefined) {
    return isEqual(f1.classList.sort(), (f2 as any).classList);
  } else if (f1.classList === undefined && f2.classList !== undefined) {
    return isEqual(f1, f2.classList.sort());
  } else if (f1.classList && f2.classList) {
    return isEqual(f1.classList.sort(), f2.classList.sort());
  }

  return false;
}

function compressFormatTempTags(formatTempTags: FormatTagTemp[]): F[] {
  const newFormatTempTags: F[] = [];
  let newFormatTempTag: F | undefined;
  let count = 0;

  formatTempTags.map(
    (f): void => {
      if (!newFormatTempTag) {
        newFormatTempTag = f;

        newFormatTempTag.charCountUncompressed = [count];
      } else {
        if (newFormatTempTag.charCountUncompressed === undefined) {
          newFormatTempTag.charCountUncompressed = [];
        }
        if (formatTempTagsAreEqual(newFormatTempTag, f)) {
          console.log('asdfoijasdofijasdoifj');

          newFormatTempTag.charCountUncompressed.push(count);
        } else {
          newFormatTempTags.push(newFormatTempTag);
          newFormatTempTag = undefined;
          newFormatTempTag = f;
          if (newFormatTempTag.charCountUncompressed === undefined) {
            newFormatTempTag.charCountUncompressed = [];
          }
          newFormatTempTag.charCountUncompressed.push(count);
        }
      }

      count = count + 1;
    },
  );
  if (newFormatTempTag) {
    newFormatTempTags.push(newFormatTempTag);
  }

  return newFormatTempTags;
}

async function parseFormatTags(verseElement: Element): Promise<F[]> {
  const childNodes = await queryChildNodes(verseElement);
  if (verifyChildNodesNotEmpty(childNodes)) {
    const formatTempTags: F[] = [];

    childNodes.map(
      (childNode): void => {
        let classList: string[] =
          (childNode as Element).classList !== undefined
            ? Array.from((childNode as Element).classList)
            : [];

        generateFormatBaseTags(childNode, formatTempTags, classList);
      },
    );
    // console.log(formatTempTags);
    const newFormatTempTags = compressFormatTempTags(formatTempTags);
    // console.log(newFormatTempTags);

    return newFormatTempTags;
  }

  const document = verseElement.ownerDocument;

  const title = document ? document.querySelector('title') : undefined;

  throw `There are still empty nodes in ${title ? title.innerHTML : 'Unknown'}`;
}

async function getDataAid(element: Element): Promise<string> {
  const dataAid = element.getAttribute('data-aid');

  if (dataAid) {
    return dataAid;
  } else {
    throw `Couldn't find data-aid in: ${element.outerHTML}`;
  }
}

async function parseVerse(verseElement: Element): Promise<Verse> {
  const verse = new Verse();
  const formatGroups = await queryFormatGroups(verseElement);
  removeEmptySpaces(verseElement);
  verse.classList = await parseClassList(verseElement);
  verse.text = await parseTextContent(verseElement);
  verse.formatGroups = formatGroups ? formatGroups : [];
  // verse._id = `${chapterID}-${verseElement.id}`;
  verse.formatTags = await parseFormatTags(verseElement);
  verse._id = await getDataAid(verseElement);
  verse.id = `${verseElement.id}`;

  // console.log(verse.id);
  // console.log(verse.formatGroups.pop());
  // console.log(verse.formatTags);
  // console.log(verseElement.textContent ? verseElement.textContent.length : 0);

  return verse;
}

export async function parseVerses(document: Document): Promise<Verse[]> {
  await normalizeCharacterCounts(document);
  if (!(await verifyVerseFlatness(document))) {
    throw 'Document isn\'t flat';
  }
  const verseElements = (await queryVerseElements(document)).filter(
    (verseElement): boolean => {
      return !verseElement.classList.contains('page-break');
    },
  );
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
}
