import { getElementAttribute } from './getElementAttribute';
export async function getLanguage(document: Document): Promise<string> {
  try {
    return getElementAttribute(document, 'html', 'lang', new RegExp(/.+/g));
  } catch (error) {
    throw error;
  }
}
