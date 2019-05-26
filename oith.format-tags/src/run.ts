import { Verse } from './models/Verse';
import { queryVerseElements } from './functions/queryVerseElements';
export async function run(document: Document): Promise<Verse[]> {

  const verseElements = await queryVerseElements(document);
  console.log(verseElements);
  return [];
}
