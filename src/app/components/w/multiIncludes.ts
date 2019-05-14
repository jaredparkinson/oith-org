export function multiIncludes<T>(target: T[], input: T[]): boolean {
  return input
    .map(
      (i): boolean => {
        return target.includes(i);
      },
    )
    .includes(true);
}
