// eslint-disable-next-line @typescript-eslint/no-var-requires
const FastGlob = require('fast-glob');
import { normalize } from 'path';
export async function getScriptureFiles(): Promise<string[]> {
  try {
    return FastGlob(normalize('../scripture_files/scriptures_unprocessed/**/**'), {
      onlyFiles: true,
    });
  } catch (error) {
    return [];
  }
}
