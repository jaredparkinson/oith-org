import { JSDOM } from 'jsdom';
import { readFile } from 'fs-extra';
export async function loadDOM(fileName: string): Promise<Document> {
  try {
    const file = await readFile(fileName);
    return new JSDOM(file).window.document;
  } catch (error) {
    throw error;
  }
}
