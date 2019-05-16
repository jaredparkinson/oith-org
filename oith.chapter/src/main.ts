import { normalize } from 'path';

import { readFile, writeFile } from 'fs-extra';
import { JSDOM } from 'jsdom';
import { parseLanguage } from './parseLanguage';
import { parseID } from './parseID';
import { getFiles } from './getFiles';

import { Chapter } from './Chapter';
import expandTilde = require('expand-tilde');

export async function parseChapter(
  document: Document,
): Promise<Chapter | undefined> {
  const chapter = new Chapter();
  const language = await parseLanguage(document);

  const id = await parseID(document, language);

  chapter._id = id;
  chapter.language = language;
  return chapter;
}

async function main(): Promise<void> {
  // await getFiles();
  console.log(await getFiles());
  try {
    const promises = (await getFiles()).map(
      async (fileName: string): Promise<void> => {
        try {
          const file = await readFile(normalize(fileName));
          const document = new JSDOM(file).window.document;

          const chapter = await parseChapter(document);
          if (chapter) {
            const outPath = normalize(
              expandTilde(
                `~/source/repos/scripture_files/scriptures/${
                  chapter._id
                }-chapter.json`,
              ),
            );
            console.log(chapter);

            await writeFile(outPath, JSON.stringify(chapter));

            await writeFile(
              normalize(
                `../src/assets/scripture_files/${await parseID(
                  document,
                  chapter.language,
                )}-chapter.json`,
              ),
              JSON.stringify(chapter),
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    );
    await Promise.all(promises);
    console.log('asdfoikjasdf');
  } catch (error) {
    console.log(error);
  }
}

main();
console.log('adsf');
