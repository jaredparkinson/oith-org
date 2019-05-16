export async function extractTextContent(
  node: Node | undefined | null,
): Promise<string> {
  return node && node.textContent ? node.textContent : '';
}
