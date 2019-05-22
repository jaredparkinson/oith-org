import FastGlob from 'fast-glob';
import { normalize } from 'path';
import { JSDOM } from 'jsdom';
import { readFile } from 'fs-extra';

function main(): void {}

main();

export async function getScriptureFiles(): Promise<string[]> {
  try {
    return FastGlob(normalize('scripture_files/scriptures_unprocessed/**/**'), {
      onlyFiles: true,
    });
  } catch (error) {
    return [];
  }
}

export async function loadDOM(fileName: string): Promise<JSDOM> {
  try {
    const file = await readFile(fileName);
    return new JSDOM(file);
  } catch (error) {
    return undefined;
  }
}
