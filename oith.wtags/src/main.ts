import { flatten } from 'lodash';
import { loadFile, getID, getLanguage } from './preprocessor/dom';
import { queryWTags } from './preprocessor/wtags';
import { normalize } from 'path';
import { writeFile } from 'fs-extra';
import { getFiles } from './preprocessor/files';
import expandTilde = require('expand-tilde');
import { makeOutputDir } from './makeOutputDir';
import { parseWTagGroups2 } from './preprocessor/WTagGroupsProcessor';

async function processFiles(fileNames: string[]): Promise<void> {
  await makeOutputDir();
  const files = fileNames.slice(0, 10000).map(
    async (fileName): Promise<void> => {
      const jsdom = await loadFile(fileName);
      const document = jsdom.window.document;
      const verses = await parseWTagGroups2(document);

      const language = await getLanguage(document);
      const id = await getID(document, language);
      const outPath = normalize(expandTilde(`./data/${id}-wtags.json`));
      // console.log(outPath);
      const wTags = flatten(await queryWTags(document));

      verses.map(
        (verse): void => {
          verse.wTags = wTags.filter(
            (w): boolean => {
              return w.verseID === verse.id;
            },
          );
          if (verse.wTags && verse.wTags.length > 0) {
            // console.log(verse.wTags);
            // console.log(verse.wTags);
          } else {
            verse.wTags = undefined;
          }
        },
      );

      await writeFile(outPath, JSON.stringify(verses));
      return;

      // removeRubyInAElements(document);
      // const verses = await parseWTagGroups(document);
      // // console.log(wTags);
      // // console.log(wTags);

      // try {
      //   if (!(await pathExists(normalize('../src/assets/scripture_files')))) {
      //     await mkdir(normalize('../src/assets/scripture_files'));
      //   }
      //   const language = await getLanguage(document);

      //   const id = await getID(document, language);
      //   const outPath = normalize(
      //     expandTilde(
      //       `~/source/repos/scripture_files/scriptures/${id}-wtags.json`,
      //     ),
      //   );
      //   // console.log(outPath);

      //   await writeFile(outPath, JSON.stringify(verses));
      //   await writeFile(
      //     normalize(
      //       `../src/assets/scripture_files/${await getID(
      //         document,
      //         language,
      //       )}-wtags.json`,
      //     ),
      //     JSON.stringify(verses),
      //   );
      // } catch {}

      // queryWTags(document);
    },
  );

  await Promise.all(files);

  console.log('asdfopijasdf');
}
async function main(): Promise<void> {
  await processFiles(await getFiles());
  // console.log('asdf');
}
main();
