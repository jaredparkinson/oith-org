import { getElementAttribute } from './functions/browser/getElementAttribute';
export async function getLanguage(document: Document): Promise<string> {
  return getElementAttribute(document, 'html', 'lang', new RegExp(/.+/g));
}
