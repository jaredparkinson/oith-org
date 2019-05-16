import { removeRubyInAElements } from './preprocessor/flattenWTags';
import { flatten } from 'lodash';
import { parseWTagGroups } from './preprocessor/wTagGroups';
import { loadFile } from './preprocessor/dom';
import { queryWTags } from './preprocessor/wtags';
import { basename, normalize } from 'path';
import { writeFile, pathExists, mkdir } from 'fs-extra';
import { getFiles } from './preprocessor/files';

async function processFiles(fileNames: string[]): Promise<void> {
  const files = fileNames.slice(0, 10000).map(
    async (fileName): Promise<void> => {
      const jsdom = await loadFile(fileName);
      const document = jsdom.window.document;

      removeRubyInAElements(document);
      const verses = parseWTagGroups(document);
      flatten(await queryWTags(document));
      // console.log(wTags);

      try {
        if (!(await pathExists(normalize('../src/assets/scripture_files')))) {
          await mkdir(normalize('../src/assets/scripture_files'));
        }
        await writeFile(
          normalize(
            `../src/assets/scripture_files/${basename(
              fileName.replace('html', 'json'),
            )}`,
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
