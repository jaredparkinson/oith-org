import { run } from './run';
import { getScriptureFiles } from '../../oith.shared/src/functions';
import { readFile } from 'fs-extra';
import { parseDocument } from './functions/node_functions/parseDocument';
async function main(): Promise<void> {
  (await getScriptureFiles()).map(
    async (fileName): Promise<void> => {
      try {
        const file = await readFile(fileName);
        const document = await parseDocument(file)

        await run(document);
      } catch (error) {
        console.log(`${fileName} - ${error}`);

      }
    },
  );

}

main();
