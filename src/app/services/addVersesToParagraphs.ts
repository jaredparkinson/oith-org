import { Verse } from 'oith.wtags';
import { Chapter } from 'oith.chapter/src/Chapter';
export async function addVersesToParagraphs(
  chapter: Chapter,
  verses: Verse[],
): Promise<void> {
  if (chapter.paragraphs) {
    chapter.paragraphs.map(
      (paragraph): void => {
        if (paragraph.verseIds) {
          paragraph.verseIds.map(
            (verseID): void => {
              const verse = verses.find(
                (verse): boolean => {
                  return verse._id === verseID;
                },
              );
              if (verse) {
                if (!paragraph.verses) {
                  paragraph.verses = [];
                }
                paragraph.verses.push(verse);
              }
            },
          );
        }
      },
    );
  }
}
