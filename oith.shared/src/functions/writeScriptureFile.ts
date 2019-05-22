import { writeFile } from 'fs-extra';
import { createOutputFolder } from './createOutputFolder';
import { normalize } from 'path';
export async function writeScriptureFile<T>(
  data: T,
  fileName: string,
): Promise<void> {
  try {
    console.log(normalize(`../scripture_files/scriptures/${fileName}`));
    // return;
    await createOutputFolder();
    await writeFile(
      normalize(`../scripture_files/scriptures/${fileName}`),
      data,
    );
  } catch (error) {
    throw error;
  }
}
