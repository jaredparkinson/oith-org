import { run } from './run';

window.addEventListener(
  'load',
  async (): Promise<void> => {
    const document = window.document;
    await run(document);
  },
);
