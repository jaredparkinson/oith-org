import { queryVerses } from './dom';
import cuid from 'cuid';
import { uniq, first, flatten } from 'lodash';
import { writeFile } from 'fs-extra';
import { normalize } from 'path';
import {
  filteredUndefined as filterUndefined,
  getRanges,
  nodeListOfToArray,
} from './shared';
import { RichTextEnum, NoteTypeEnum } from '../..';
import { WRichText } from '../models/WRichText';
import { WRef } from '../models/WRef';
import { W } from '../interfaces/W';

class WTagStage1 {
  public verseID: string;
  public classList: string[] | string;
  public characterCount: number[] | number | [number, number][];
  public text: string;
}

function getNewClassList(child: Element, newClassList: string[]): string[] {
  Array.from(child.attributes)
    .filter(
      (attr): boolean => {
        return attr.name !== 'n';
      },
    )
    .map(
      (attr): void => {
        if (attr.name.toLowerCase() === 'classname') {
          newClassList = newClassList.concat(attr.value.split(' '));
        } else {
          newClassList = newClassList.concat(attr.value.split(','));

          // console.log(newCssClassList);
        }
      },
    );
  return newClassList;
}
function childToPreWTags(
  child: Element,
  wTagStage1: WTagStage1[],
  verseID: string,
  classList: string[] = [],
): void {
  switch (child.nodeName) {
    case '#text': {
      if (child.textContent) {
        child.textContent.split('').map(
          (c): void => {
            wTagStage1.push({
              classList: classList,
              verseID: verseID,
              characterCount: [wTagStage1.length],
              text: c,
            });
          },
        );
      }
      break;
    }

    default: {
      let newCssClassList: string[] = classList;
      newCssClassList = getNewClassList(child, newCssClassList);
      nodeListOfToArray(child.childNodes).map(
        (child2): void => {
          childToPreWTags(
            child2 as Element,
            wTagStage1,
            verseID,
            newCssClassList,
          );
        },
      );
      break;
    }
  }
}

/*
  splitWTags splits out the classlists into individual wTags.
*/
function splitPreWTags(wTagStage1: WTagStage1[]): void {
  wTagStage1
    .filter(
      (w): boolean => {
        return w.classList.length > 1;
      },
    )
    .map(
      (w2): void => {
        (w2.classList as string[]).map(
          (m): void => {
            wTagStage1.push({
              classList: m,
              characterCount: w2.characterCount,
              verseID: w2.verseID,
              text: w2.text,
            });
          },
        );
      },
    );
}

/**
 *
 * @param wTagStage1 Takes the wTags made from splitWTags and each classList every character count number that has that class
 */

function compressPreWTags(wTagStage1: WTagStage1[]): WTagStage1[] {
  const newWTagStage1: WTagStage1[] = [];
  console.log(
    uniq(
      flatten(
        wTagStage1.map(
          (w): string[] => {
            return w.classList as string[];
          },
        ),
      ),
    ),
  );

  filterUndefined<string>(
    uniq(
      flatten(
        wTagStage1.map(
          (w): string[] => {
            return w.classList as string[];
          },
        ),
      ),
    ),
  ).map(
    (i): void => {
      if (i === 'tc-heb-1-1a') {
        console.log('tc-heb-1-1a');
      }
      const wTagStage1Filtered = wTagStage1.filter(
        (w): boolean => {
          return w.classList.includes(i);
        },
      );
      const wTag = first(wTagStage1Filtered);

      if (wTag) {
        newWTagStage1.push({
          classList: [i],
          characterCount: getRanges(
            uniq(
              wTagStage1Filtered.map(
                (w): number => {
                  return w.characterCount[0];
                },
              ),
            ),
          ).map(
            (r): [number, number] => {
              r[1] = r[1] + 1;
              return r;
            },
          ),
          text: wTag.text,
          verseID: wTag.verseID,
        });
      }
    },
  );
  return newWTagStage1;
}

function isRef(classList: string): boolean {
  const newNoteRegex = new RegExp(/\d{4}(\-\d{2}){6}/s);
  const engNoteRegex = new RegExp(/\d{9}/s);
  const tcNoteStartsWith = 'tc-';
  // console.log(classList);

  const ref = first(classList);
  if (ref === 'tc-heb-1-1a') {
    console.log('tc-heb-1-1a');
  }

  return ref
    ? newNoteRegex.test(ref) ||
        engNoteRegex.test(ref) ||
        ref.startsWith(tcNoteStartsWith)
    : false;
}

function isRichTest(classList: string[]): boolean {
  const firstClass = first(classList);
  const richTestList = [
    'verse-number',
    'clarity-word',
    'prose',
    'poetry',
    'translit',
    'language',
    'deity-name',
    'smallCaps',
    'uppercase',
    'entry',
    'closing',
    'signature',
    'short-title',
    'break',
    'salutation',
    'office',
    'date',
    'addressee',
    'answer',
    'question',
    'line',
    'para-mark',
    'selah',
  ];
  return firstClass ? richTestList.includes(firstClass) : false;
}

function isIgnore(className: string[]): boolean {
  const firstClass = first(className);
  return firstClass
    ? [
        'scripture-ref',
        'title',
        'intro',
        'subtitle',
        'page-break',
        'title-number',
        'study-intro',
        'study-summary',
      ].includes(firstClass)
    : false;
}

function convertClassToWTagType(wTagStage1: WTagStage1): WRichText {
  const wTag = new WRichText();
  wTag.verseID = wTagStage1.verseID;
  wTag.charCount = uniq(wTagStage1.characterCount as [number, number][]);
  switch (first(wTagStage1.classList)) {
    case 'verse-number': {
      wTag.richText = RichTextEnum.verseNumber;
      return wTag;
    }
    case 'clarity-word': {
      wTag.richText = RichTextEnum.clarityWord;
      return wTag;
    }
    case 'translit': {
      wTag.richText = RichTextEnum.translit;
      return wTag;
    }
    case 'language': {
      wTag.richText = RichTextEnum.language;
      return wTag;
    }
    case 'deity-name': {
      wTag.richText = RichTextEnum.deityName;
      return wTag;
    }
    case 'smallCaps': {
      wTag.richText = RichTextEnum.smallCaps;
      return wTag;
    }
    case 'uppercase': {
      wTag.richText = RichTextEnum.uppercase;
      return wTag;
    }

    case 'entry': {
      wTag.richText = RichTextEnum.entry;
      return wTag;
    }
    case 'closing': {
      wTag.richText = RichTextEnum.closing;
      return wTag;
    }
    case 'signature': {
      wTag.richText = RichTextEnum.signature;
      return wTag;
    }
    case 'short-title': {
      wTag.richText = RichTextEnum.shortTitle;
      return wTag;
    }
    case 'break': {
      wTag.richText = RichTextEnum.break;
      return wTag;
    }
    case 'salutation': {
      wTag.richText = RichTextEnum.salutation;
      return wTag;
    }
    case 'office': {
      wTag.richText = RichTextEnum.office;
      return wTag;
    }
    case 'date': {
      wTag.richText = RichTextEnum.date;
      return wTag;
    }
    case 'addressee': {
      wTag.richText = RichTextEnum.addressee;
      return wTag;
    }
    case 'answer': {
      wTag.richText = RichTextEnum.answer;
      return wTag;
    }
    case 'question': {
      wTag.richText = RichTextEnum.question;
      return wTag;
    }
    case 'line': {
      wTag.richText = RichTextEnum.line;
      return wTag;
    }
    case 'para-mark': {
      wTag.richText = RichTextEnum.paraMark;
      return wTag;
    }
    case 'selah': {
      wTag.richText = RichTextEnum.selah;
      return wTag;
    }
  }
  return new WRichText();
}

function convertClassToRef(wTagStage1: WTagStage1): WRef {
  const wRef = new WRef();
  const ref = first(wTagStage1.classList);

  wRef.verseID = wTagStage1.verseID;
  wRef.optional = true;
  wRef.charCount = uniq(wTagStage1.characterCount as [number, number][]);
  wRef.ref = ref ? ref : '';

  const newNoteRegex = new RegExp(/\d{4}(\-\d{2}){6}/s);
  const engNoteRegex = new RegExp(/\d{4}(\-\d{2}){6}/s);
  const tcNoteStartsWith = 'tc-';
  if (ref) {
    if (newNoteRegex.test(ref)) {
      wRef.noteType = NoteTypeEnum.New;
    } else if (engNoteRegex.test(ref)) {
      wRef.noteType = NoteTypeEnum.Eng;
    } else if (ref.startsWith(tcNoteStartsWith)) {
      wRef.noteType = NoteTypeEnum.TC;
    }
  }
  return wRef;
}

function convertWTagStage1ToWTag(wTagStage1s: WTagStage1[]): W[] {
  const wTags: W[] = [];

  wTagStage1s.map(
    (wTagStage1): void => {
      if (wTagStage1.verseID === 'p1') {
        if (wTagStage1.classList.includes('tc-heb-1-1a')) {
          console.log('tc-heb-1-1a');
        }
      }
      if (isIgnore(wTagStage1.classList as string[])) {
      } else if (isRef(wTagStage1.classList as string)) {
        wTags.push(convertClassToRef(wTagStage1));
      } else if (isRichTest(wTagStage1.classList as string[])) {
        wTags.push(convertClassToWTagType(wTagStage1));
      }
    },
  );

  return wTags;
}

function verseToWTags(verseElement: Element): W[] {
  const wTagStage1: WTagStage1[] = [];
  nodeListOfToArray(verseElement.childNodes).map(
    (child): void => {
      childToPreWTags(child as Element, wTagStage1, verseElement.id);
    },
  );
  splitPreWTags(wTagStage1);
  const compressed = compressPreWTags(wTagStage1);
  return convertWTagStage1ToWTag(compressed);
  // return wTagStage1.filter(
  //   (w): boolean => {
  //     return w.classList.length === 1;
  //   },
  // );
}
export async function queryWTags(document: Document): Promise<W[][]> {
  const verseElements = nodeListOfToArray(await queryVerses(document));
  const wTags = verseElements.map(
    (verseElement): W[] => {
      return verseToWTags(verseElement);
    },
  );
  return wTags;
  await writeFile(
    normalize(`./data/${cuid()}-w2.json`),
    JSON.stringify(
      wTags.filter(
        (wTag): boolean => {
          return wTag.length > 0;
        },
      ),
    ),
  );
}
