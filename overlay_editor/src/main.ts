import Vue from './vue';
import { run } from '../../oith.format-tags/src/run';
import { LDSSourceVerse, Verse } from '../../oith.format-tags/src/models/Verse';
import { Environment } from '../../oith.format-tags/src/Environment';
import 'babel-polyfill';
import { initNoteFileOpener } from './initNoteFileOpener';
import { navigation, Navigation } from './functions/loadNotes';

function main(): void {
  initNoteFileOpener();
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

Vue.component('nav-item', {
  props: ['nav'],
  template: `<a  v-on:click="navigationClick(nav)">{{ nav.text }}</a>`,
});

export const appVue = new Vue({
  el: '#app',
  data: data,
});

export const navigationVue = new Vue({
  el: '#navigation',
  data: {
    navigation: navigation,
  },
  methods: {
    navigationClick(nav: Navigation): void {
      console.log(nav.href);
    },
  },
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
