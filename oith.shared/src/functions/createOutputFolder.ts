import { normalize } from 'path';
import { pathExists, mkdir } from 'fs-extra';
export async function createOutputFolder(): Promise<void> {
  const outPath = normalize('./scripture_files/scriptures');
  const outPathParent = normalize('./scripture_files');
  if (!pathExists(outPathParent)) {
    await mkdir(outPathParent);
  }
  if (!pathExists(outPath)) {
    await mkdir(outPath);
  }
}
