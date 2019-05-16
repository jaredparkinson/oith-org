export async function parseReferenceLabelClass(
  className: string,
): Promise<[string, string]> {
  switch (className) {
    case 'reference-label-quotation': {
      return ['quotation', 'QUO'];
    }
    case 'reference-label-phrasing': {
      return ['phrasing', 'PHR'];
    }
    case 'reference-label-or': {
      return ['or', 'OR'];
    }
    case 'reference-label-ie': {
      return ['ie', 'IE'];
    }
    case 'reference-label-hebrew': {
      return ['hebrew', 'HEB'];
    }
    case 'reference-label-greek': {
      return ['greek', 'GR'];
    }
    case 'reference-label-archaic': {
      return ['archaic', 'KJV'];
    }
    case 'reference-label-historical': {
      return ['historical', 'HST'];
    }
    case 'reference-label-cr': {
      return ['cr', 'CR'];
    }
    case 'reference-label-alt': {
      return ['alt', 'ALT'];
    }
    case 'reference-label-harmony': {
      return ['harmony', 'HMY'];
    }
    case 'reference-label-tg': {
      return ['tg', 'TG'];
    }
    case 'reference-label-gs': {
      return ['gs', 'GS'];
    }
    default: {
      return ['', ''];
    }
  }
}
