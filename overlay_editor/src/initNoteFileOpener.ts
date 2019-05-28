import { loadNotes } from './functions/loadNotes';
export function initNoteFileOpener(): void {
  const notesFileOpener = document.querySelector(
    '#notesFileOpener',
  ) as HTMLInputElement;
  if (notesFileOpener) {
    notesFileOpener.addEventListener(
      'change',
      (): void => {
        if (notesFileOpener.files) {
          const file = notesFileOpener.files[0];
          if (file.type === 'text/xml') {
            const reader = new FileReader();
            reader.onload = async (): Promise<void> => {
              await loadNotes(reader.result as string);
            };
            reader.readAsText(file);
          }
        }
      },
    );
  }
}
