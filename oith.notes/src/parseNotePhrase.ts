import { NotePhrase } from './models/NotePhrase';
import { extractTextContent } from './extractTextContent';
export async function parseNotePhrase(
  secondaryNoteElement: Element,
): Promise<NotePhrase | undefined> {
  const notePhraseElement = secondaryNoteElement.querySelector('.note-phrase');
  if (notePhraseElement) {
    const id = notePhraseElement.id;
    const classList = Array.from(notePhraseElement.classList);
    const notePhrase = new NotePhrase();
    const textContent = await extractTextContent(notePhraseElement);
    notePhrase._id = id;
    notePhrase.classList = classList.length > 0 ? classList : undefined;
    notePhrase.text = textContent;
    return notePhrase;
  } else {
    return undefined;
  }
}
