import { run } from './run';
import { Environment } from './Environment';

window.addEventListener(
  'load',
  async (): Promise<void> => {
    const document = window.document;
    await run(document, Environment.browser);
  },
);
