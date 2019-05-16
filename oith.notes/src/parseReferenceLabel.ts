import { ReferenceLabel } from './models/ReferenceLabel';
import { parseReferenceLabelClass } from './parseReferenceLabelClass';
export async function parseReferenceLabel(
  noteRefElement: Element,
): Promise<ReferenceLabel | undefined> {
  const referenceLabelElement = noteRefElement.querySelector(
    'span[class*=reference-label]',
  );
  if (referenceLabelElement) {
    const referenceLabel = new ReferenceLabel();
    const referenceLabelClass = await parseReferenceLabelClass(
      referenceLabelElement.className,
    );
    referenceLabel.refLabelName = referenceLabelClass[0];
    referenceLabel.refLabelShortName = referenceLabelClass[1];
    return referenceLabel;
  }
  return undefined;
}
