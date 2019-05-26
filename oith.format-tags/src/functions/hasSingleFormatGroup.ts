export async function hasSingleFormatGroup(element: Element): Promise<boolean> {
  return (
    Array.from(
      element.querySelectorAll(['br', 'ruby', 'a', '.page-break'].toString()),
    ).filter(
      (childElement): boolean => {
        return !childElement.hasAttribute('marker');
      },
    ).length === 0
  );
}
