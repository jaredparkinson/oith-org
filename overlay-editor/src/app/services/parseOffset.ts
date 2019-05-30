import { range, flatten } from 'lodash';
export function parseOffset(compressedOffset: string): number[] | undefined {
  if (compressedOffset === '') {
    return undefined;
  }
  let offsetSplit: number[] = [];
  compressedOffset.split(',').map(
    (r): void => {
      if (r.indexOf('-') !== -1) {
        const split2 = r.split('-');
        const f = parseInt(split2[0]);
        const l = parseInt(split2[1]);
        offsetSplit = offsetSplit.concat(range(f, l + 1));
      } else {
        offsetSplit.push(parseInt(r));
      }
    },
  );
  return offsetSplit;
}
export function parseOffsetNumbers(
  compressedOffset: [number, number][] | undefined,
): number[] | undefined {
  return compressedOffset
    ? flatten(
        compressedOffset.map(
          (compressedOff): number[] => {
            return range(compressedOff[0], compressedOff[1]);
          },
        ),
      )
    : undefined;
}
