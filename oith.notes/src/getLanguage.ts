import { getElementAttribute } from './getElementAttribute';
export async function getLanguage(document: Document): Promise<string> {
  return getElementAttribute(document, 'html', 'lang', new RegExp(/.+/g));
}
