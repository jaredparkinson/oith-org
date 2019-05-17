import { removeRubyInAElements } from './preprocessor/flattenWTags';
import { flatten } from 'lodash';
import { parseWTagGroups } from './preprocessor/wTagGroups';
import { loadFile, getID, getLanguage } from './preprocessor/dom';
import { queryWTags } from './preprocessor/wtags';
import { normalize } from 'path';
import { writeFile, pathExists, mkdir } from 'fs-extra';
import { getFiles } from './preprocessor/files';
import expandTilde = require('expand-tilde');
import { makeOutputDir } from './makeOutputDir';

async function processFiles(fileNames: string[]): Promise<void> {
  await makeOutputDir();
  const files = fileNames.slice(0, 10000).map(
    async (fileName): Promise<void> => {
      const jsdom = await loadFile(fileName);
      const document = jsdom.window.document;

      removeRubyInAElements(document);
      const verses = parseWTagGroups(document);
      const wTags = flatten(await queryWTags(document));
      // console.log(wTags);

      verses.map(
        (verse): void => {
          verse.wTags = wTags.filter(
            (w): boolean => {
              return w.verseID === verse._id;
            },
          );
          if (verse.wTags.length > 0) {
            // console.log(verse.wTags);
            console.log(verse.wTags);
          } else {
            verse.wTags = undefined;
          }
        },
      );
      // console.log(wTags);

      try {
        if (!(await pathExists(normalize('../src/assets/scripture_files')))) {
          await mkdir(normalize('../src/assets/scripture_files'));
        }
        const language = await getLanguage(document);

        const id = await getID(document, language);
        const outPath = normalize(
          expandTilde(
            `~/source/repos/scripture_files/scriptures/${id}-wtags.json`,
          ),
        );
        // console.log(outPath);

        await writeFile(outPath, JSON.stringify(verses));
        await writeFile(
          normalize(
            `../src/assets/scripture_files/${await getID(
              document,
              language,
            )}-wtags.json`,
          ),
          JSON.stringify(verses),
        );
      } catch {}

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
