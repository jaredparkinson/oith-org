import { normalize } from 'path';
import { pathExists, mkdir } from 'fs-extra';
export async function createOutputFolder(): Promise<void> {
  const outPath = normalize('../scripture_files/scriptures');
  const outPathParent = normalize('../scripture_files');
  console.log(await pathExists(outPathParent));

  if (!(await pathExists(outPathParent))) {
    await mkdir(outPathParent);
  }
  if (!(await pathExists(outPath))) {
    await mkdir(outPath);
  }
}
