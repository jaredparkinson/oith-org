import { queryVerses, getID, getLanguage } from './dom';
import { intersection, flatten } from 'lodash';
import { WTagGroup } from '../interfaces/WTagGroup';
import { WTagGroupType, WTagGroupTypeEnum } from '../enums/WTagGroupType';
import { Verse } from '../models/Verse';
import { WTagGroupText } from '../models/WTagGroupText';
import { WTagGroupA } from '../models/WTagGroupA';
import { WTagGroupRuby } from '../models/WTagGroupRuby';

class ParentGroup {
  public elements: Node[] = [];
  public type: string = 'text';
}
class VerseParent {
  public verseID: string;
  public parentGroups: ParentGroup[];
}

export async function multiIncludes<T>(
  list1: T[],
  list2: T[],
): Promise<boolean> {
  const includes = list1
    .map(
      (list1Item): boolean => {
        return list2.includes(list1Item);
      },
    )
    .filter(
      (include): boolean => {
        return include === true;
      },
    );

  return includes.length > 0;
}

function isParentElement(node: Node): boolean {
  const nodeNameParents: string[] = ['ruby', 'a'];
  const classListParents: string[] = ['dominant', 'subordinate'];

  if (node.nodeName === '#text') {
    return false;
  }
  return (
    nodeNameParents.includes(node.nodeName.toLowerCase()) ||
    intersection(classListParents, Array.from((node as Element).classList))
      .length > 0
  );
}

async function parseParentGroups(elements: Element[]): Promise<VerseParent[]> {
  const verseParents: VerseParent[] = [];
  let parentGroups: ParentGroup[] = [];

  let parentGroup: ParentGroup | undefined;
  let verseParent: VerseParent;
  elements
    .filter(
      (element): boolean => {
        return element.id.length > 0;
      },
    )
    .map(
      (element): void => {
        parentGroups = [];
        parentGroup = undefined;
        verseParent = new VerseParent();
        verseParent.verseID = element.id;
        const childNodes = Array.from(element.childNodes);

        childNodes.map(
          (childNode): void => {
            const isParent = isParentElement(childNode);
            if (isParent) {
              if (parentGroup) {
                parentGroups.push(parentGroup);
                parentGroup = undefined;
              }
              parentGroups.push({
                elements: [childNode],
                type: childNode.nodeName.toLowerCase(),
              });
            } else {
              if (!parentGroup) {
                parentGroup = new ParentGroup();
              }
              parentGroup.elements.push(childNode);
              // console.log(parentGroup.elements.length);
            }
          },
        );
        if (parentGroup) {
          parentGroups.push(parentGroup);
        }
        verseParent.parentGroups = parentGroups;
        verseParents.push(verseParent);
      },
    );
  // await Promise.all(parentGroupPromises);
  return verseParents;
}

function getWTagGroupType(parentGroup: ParentGroup): WTagGroupType {
  switch (parentGroup.type) {
    case 'span':
    case 'text':
      return WTagGroupTypeEnum.Text;
    case 'a':
      return WTagGroupTypeEnum.A;
    case 'ruby':
      return WTagGroupTypeEnum.Ruby;
  }
  return WTagGroupTypeEnum.Text;
}

function getTextContentLength(parentGroup: ParentGroup) {
  return parentGroup.elements
    .map(element => {
      return element.textContent ? element.textContent.length : 0;
    })
    .reduce((total, amount) => {
      return total + amount;
    });
}

function parseWTagType(wTagGroupType: WTagGroupType) {
  switch (wTagGroupType) {
    default:
    case WTagGroupTypeEnum.Text: {
      return new WTagGroupText();
    }
    case WTagGroupTypeEnum.A: {
      return new WTagGroupA();
    }
    case WTagGroupTypeEnum.Ruby: {
      return new WTagGroupRuby();
    }
  }
}

function setHref(wTagGroup: WTagGroupA, element: Element) {
  if (wTagGroup.href) {
    const href = element.getAttribute('href');

    wTagGroup.href = href ? href : '';
  }
}

function parseClassList(parentGroup: ParentGroup): string[] | undefined {
  const classList = flatten(
    parentGroup.elements.map(
      (element): string[] => {
        if ((element as any).classList) {
          return Array.from((element as any).classList);
        }
        return [];
      },
    ),
  );
  return classList.length > 0 ? classList : undefined;
}

export function setWTagGroupTextForTestingPurposes(
  wTagGroup: WTagGroup,
  verseElement: Element,
) {
  (wTagGroup as any).text = verseElement.textContent
    ? verseElement.textContent.slice(
        wTagGroup.charCountCompress[0],
        wTagGroup.charCountCompress[1],
      )
    : '';
}
async function verseParentsToWTagGroups(
  verseParents: VerseParent[],
  verseElements: Element[],
  documentID: string,
): Promise<Verse[]> {
  const verses = verseParents.map(
    (verseParent): Verse | undefined => {
      const verseElement = verseElements.find(
        (verseElement): boolean => {
          return verseElement.id === verseParent.verseID;
        },
      );

      if (verseElement) {
        const verse = new Verse();
        const id = verseElement.id;
        const classList = Array.from(verseElement.classList);

        verse.id = id;
        verse._id = `${documentID}-${id}`;
        verse.classList = classList.length > 0 ? classList : undefined;
        verse.text = verseElement.textContent ? verseElement.textContent : '';

        let count = 0;
        verseParent.parentGroups.map(
          (parentGroup): void => {
            let wTagGroupType = getWTagGroupType(parentGroup);
            const length = getTextContentLength(parentGroup);
            const wTagGroup: WTagGroup = parseWTagType(wTagGroupType);

            setHref(wTagGroup as WTagGroupA, verseElement);
            wTagGroup.classList = parseClassList(parentGroup);
            wTagGroup.charCountCompress = [count, count + length];
            count = count + length;
            if (wTagGroup.type === WTagGroupTypeEnum.Ruby) {
              console.log('Need to finish ruby');
            }

            verse.wTagGroups.push(wTagGroup);
          },
        );
        return verse;
      }
      return undefined;
    },
  );
  return verses.filter(
    (verse): boolean => {
      return verse !== undefined;
    },
  ) as Verse[];
}

export async function parseWTagGroups2(document: Document): Promise<Verse[]> {
  const verseElements = Array.from(await queryVerses(document)).filter(
    (verseElement): boolean => {
      return verseElement.id.length > 0;
    },
  );

  const verseParents = await parseParentGroups(verseElements);
  const language = await getLanguage(document);
  const documentID = await getID(document, language);

  const verses = await verseParentsToWTagGroups(
    verseParents,
    verseElements,
    documentID,
  );
  return verses;

  // verseParents.map(
  //   (verseParent): void => {
  //     const verse = document.getElementById(verseParent.verseID);
  //     console.log(verse ? verse.textContent : '');

  //     console.log(verse && verse.textContent ? verse.textContent.length : 0);

  //     verseParent.parentGroups.map(
  //       (parentGroup): void => {
  //         parentGroup.elements.map(element => {
  //           console.log(
  //             `${verseParent.verseID} ${element.nodeName} ${
  //               element.textContent ? element.textContent.length : 0
  //             }`,
  //           );
  //         });

  //         // parentGroup.elements.map(
  //         //   (element): void => {
  //         //     console.log(element.nodeName);
  //         //   },
  //         // );
  //       },
  //     );
  //   },
  // );
  // console.log(verseParents);

  // const parents = await queryParents(verses);
}
