import { range } from 'lodash';
export function parseOffset(compressedOffset: string): number[] {
  let offsetSplit: number[] = [];
  compressedOffset.split(',').map(
    (r): void => {
      if (r.indexOf('-') !== -1) {
        const split2 = r.split('-');
        const f = parseInt(split2[0]);
        const l = parseInt(split2[1]);
        offsetSplit = offsetSplit.concat(range(f, l));
      } else {
        offsetSplit.push(parseInt(r));
      }
    },
  );
  return offsetSplit;
}
