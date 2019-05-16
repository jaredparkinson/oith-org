import { removeRubyInAElements } from './preprocessor/flattenWTags';
import { flatten } from 'lodash';
import { parseWTagGroups } from './preprocessor/wTagGroups';
import { loadFile } from './preprocessor/dom';
import { queryWTags } from './preprocessor/wtags';
import { basename, normalize } from 'path';
import { writeFile } from 'fs-extra';
import { getFiles } from './preprocessor/files';

async function processFiles(fileNames: string[]): Promise<void> {
  const files = fileNames.slice(0, 10000).map(
    async (fileName): Promise<void> => {
      const jsdom = await loadFile(fileName);
      const document = jsdom.window.document;

      removeRubyInAElements(document);
      const verses = parseWTagGroups(document);
      const wTags = flatten(await queryWTags(document));
      console.log(wTags);

      verses.map(
        (verse): void => {
          verse.wTags = wTags.filter(
            (w): boolean => {
              return w.verseID === verse._id;
            },
          );
          if (verse.wTags.length > 0) {
            console.log(verse.wTags);
          } else {
            verse.wTags = undefined;
          }
        },
      );
      try {
        await writeFile(
          normalize(`./data/${basename(fileName.replace('html', 'json'))}`),
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
