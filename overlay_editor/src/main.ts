import Vue from './vue';
import { run } from '../../oith.format-tags/src/run';
import { LDSSourceVerse, Verse } from '../../oith.format-tags/src/models/Verse';
import { Environment } from '../../oith.format-tags/src/Environment';
import 'babel-polyfill';

function loadNotesFromFile(noteFile: string): void {
  console.log(noteFile);
}

function main(): void {
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
            let asdf: string | null | ArrayBuffer = null;
            reader.onload = (): void => {
              loadNotesFromFile(reader.result as string);
            };
            reader.readAsText(file);
          }
        }
      },
    );
  }
  // browser();
  // const verses = run(document, Environment.browser) as LDSSourceVerse[];
  // console.log(verses);
}

let data: { verses: Verse[] | undefined } = {
  verses: undefined,
};

Vue.component('verse-item', {
  props: ['verse'],
  template: `<p v-bind:class="verse.classList ? verse.classList.toString().replace(',',''): ''" >{{ verse.text }}</p>`,
});

new Vue({
  el: '#app',
  data: data,
});

window.addEventListener(
  'load',
  async (): Promise<void> => {
    main();
    // const document = window.document;
    // console.log('asdf');
    // const verses = (await run(
    //   document,
    //   Environment.browser,
    // )) as LDSSourceVerse[];
    // renderVerses(verses);
    // data.verses = verses;
    // console.log(verses);
    // await loadNotes();
  },
);
