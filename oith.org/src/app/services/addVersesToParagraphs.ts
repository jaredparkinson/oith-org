import { Chapter, Verse } from '../../../../oith.shared';

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
                  return verse.id === verseID;
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
