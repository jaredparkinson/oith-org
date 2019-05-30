export function parseRefLabel(refLabel: string): [string, string, number] {
  switch (refLabel) {
    case 'reference-label-alt': {
      return ['reference-label-alt', 'ALT', 0];
    }
    case 'reference-label-bd': {
      return ['reference-label-bd', 'BD', 1];
    }
    case 'reference-label-cross-ref': {
      return ['reference-label-cross-ref', 'CR', 2];
    }
    case 'reference-label-error': {
      return ['reference-label-error', '', 3];
    }
    case 'reference-label-geography': {
      return ['reference-label-geography', 'GEO', 4];
    }
    case 'reference-label-gs': {
      return ['reference-label-gs', 'GS', 5];
    }
    case 'reference-label-harmony': {
      return ['reference-label-harmony', 'HMY', 6];
    }
    case 'reference-label-hebrew': {
      return ['reference-label-hebrew', 'HEB', 7];
    }
    case 'reference-label-history': {
      return ['reference-label-history', 'HST', 8];
    }
    case 'reference-label-ie': {
      return ['reference-label-ie', 'IE', 9];
    }
    case 'reference-label-or': {
      return ['reference-label-or', 'OR', 10];
    }
    case 'reference-label-phrasing': {
      return ['reference-label-phrasing', 'PHR', 11];
    }
    case 'reference-label-quotation': {
      return ['reference-label-quotation', 'QUO', 12];
    }
    case 'reference-label-tg': {
      return ['reference-label-tg', 'TG', 13];
    }
    case 'reference-label-translation': {
      return ['reference-label-translation', 'TRN', 14];
    }
    default:
      return ['', '', 15];
  }
}
