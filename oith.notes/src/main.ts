// import { getFiles } from './files';
import {
  getScriptureFiles,
  writeScriptureFile,
  getID,
} from '../../oith.shared/src/functions';
import { readFile } from 'fs-extra';
import { normalize } from 'path';
import { JSDOM } from 'jsdom';
import { Note } from './models/Note';
import { SecondaryNote } from './models/SecondaryNote';
import { parseNotePhrase } from './parseNotePhrase';
import { extractTextContent } from './extractTextContent';
import { NoteRef } from './models/NoteRef';
import { parseReferenceLabel } from './parseReferenceLabel';
// import { parseID } from './parseID';
import { getLanguage } from './getLanguage';
// import expandTilde = require('expand-tilde');
import { NoteType } from './models/NoteType';

export async function parseNoteType(
  noteRefElement: Element,
): Promise<NoteType> {
  if (noteRefElement.className.includes('note-reference-eng')) {
    return NoteType.Eng;
  }
  if (noteRefElement.className.includes('note-reference-new')) {
    return NoteType.New;
  }
  if (noteRefElement.className.includes('note-reference-tc')) {
    return NoteType.TC;
  }

  return NoteType.Eng;
}

export async function parseNoteRefs(
  secondaryNoteElement: Element,
): Promise<NoteRef[]> {
  const noteRefPromises = Array.from(
    secondaryNoteElement.querySelectorAll('p[class*=note-reference'),
  ).map(
    async (noteRefElement): Promise<NoteRef | undefined> => {
      try {
        const noteRef = new NoteRef();

        const id = noteRefElement.id;
        const classList = Array.from(noteRefElement.classList);
        const text = noteRefElement.innerHTML;
        const referenceLabel = await parseReferenceLabel(noteRefElement);

        noteRef._id = id;
        noteRef.classList = classList.length > 0 ? classList : undefined;
        noteRef.text = text;
        noteRef.referenceLabel = referenceLabel;
        noteRef.type = await parseNoteType(noteRefElement);
        // console.log(noteRef);

        return noteRef;
      } catch (error) {
        console.log(error);

        return undefined;
      }
    },
  );

  // console.log(secondaryNoteElement.querySelectorAll('[class*=note-ref'));
  // console.log(secondaryNoteElement.innerHTML);
  const noteRefs = (await Promise.all(noteRefPromises)).filter(
    (noteRef): boolean => {
      return noteRef !== undefined;
    },
  ) as NoteRef[];

  return noteRefs;
}

export async function parseSecondaryNotes(
  document: Document,
  noteId: string,
): Promise<SecondaryNote[]> {
  const secondaryNotePromises = Array.from(
    document.querySelectorAll(`#${noteId} > div`),
  ).map(
    async (secondaryNoteElement): Promise<SecondaryNote> => {
      const secondaryNote = new SecondaryNote();

      const id = secondaryNoteElement.id;
      const classList = Array.from(secondaryNoteElement.classList);
      const noteMarker = secondaryNoteElement.getAttribute('note-marker');
      const verseMarker = secondaryNoteElement.getAttribute('note-marker');

      secondaryNote.id = id;
      secondaryNote.classList = classList.length > 0 ? classList : undefined;
      secondaryNote.noteMarker = noteMarker ? noteMarker : undefined;
      secondaryNote.verseMarker = verseMarker ? verseMarker : undefined;
      secondaryNote.notePhrase = await parseNotePhrase(secondaryNoteElement);
      secondaryNote.noteRefs = await parseNoteRefs(secondaryNoteElement);
      return secondaryNote;
    },
  );

  return await Promise.all(secondaryNotePromises);
}

export async function parseNotes(document: Document): Promise<Note[]> {
  const notes: Promise<Note>[] = Array.from(
    document.querySelectorAll('footer note'),
  ).map(
    async (noteElement): Promise<Note> => {
      const id = noteElement.id;
      const noteTitle = await extractTextContent(
        noteElement.querySelector('.note-title'),
      );
      const noteShortTitle = await extractTextContent(
        noteElement.querySelector('.note-short-title'),
      );

      const note = new Note();

      note._id = id;
      note.noteShortTitle = noteShortTitle;
      note.noteTitle = noteTitle;

      note.secondaryNotes = await parseSecondaryNotes(document, id);
      return note;
    },
  );
  return await Promise.all(notes);
}

async function main(): Promise<void> {
  console.log('hhg');
  // await getFiles();
  try {
    const promises = (await getScriptureFiles()).map(
      async (fileName: string): Promise<void> => {
        try {
          const file = await readFile(normalize(fileName));
          const dom = new JSDOM(file);
          const document = dom.window.document;
          // console.log(dom.window.document.querySelector('title'));

          const notes = await parseNotes(document);
          const language = await getLanguage(document);
          // const outPath = normalize(
          //   expandTilde(
          //     `~/source/repos/scripture_files/scriptures/${await parseID(
          //       document,
          //       language,
          //     )}-notes.json`,
          //   ),
          // );
          await writeScriptureFile(
            notes,
            `${await getID(document, language)}-notes.json`,
          );

          // await writeFile(
          //   normalize(
          //     `../src/assets/scripture_files/${await parseID(
          //       document,
          //       language,
          //     )}-notes.json`,
          //   ),
          //   JSON.stringify(notes),
          // );
        } catch (error) {
          console.log(error);
        }
      },
    );
    await Promise.all(promises);
    console.log('asdfoikjasdf');
  } catch (error) {}
}

main();
