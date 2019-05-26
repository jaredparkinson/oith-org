import { verseSelectors } from '../constants/verse-selectors';

export async function queryVerseElements(
  document: Document,
): Promise<Element[]> {
  return Array.from(document.querySelectorAll(verseSelectors.toString()));
}
