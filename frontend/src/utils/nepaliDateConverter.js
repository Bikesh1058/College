import NepaliDate from 'nepali-date-converter';

/**
 * Converts a valid BS date string (YYYY-MM-DD) to an AD date string (YYYY-MM-DD).
 * Returns empty string if invalid or out of range.
 */
export function convertBsToAd(bsString) {
  if (!bsString || typeof bsString !== 'string') return '';
  const trimmed = bsString.trim();
  // Ensure basic format YYYY-MM-DD or YYYY/MM/DD
  const parts = trimmed.replace(/\//g, '-').split('-');
  if (parts.length !== 3) return '';

  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d || isNaN(y) || isNaN(m) || isNaN(d)) return '';
  if (y < 2000 || y > 2090 || m < 1 || m > 12 || d < 1 || d > 32) return '';

  try {
    const nd = new NepaliDate(y, m - 1, d);
    const jsDate = nd.toJsDate();
    if (!jsDate || isNaN(jsDate.getTime())) return '';

    const adYear = jsDate.getFullYear();
    const adMonth = String(jsDate.getMonth() + 1).padStart(2, '0');
    const adDay = String(jsDate.getDate()).padStart(2, '0');
    return `${adYear}-${adMonth}-${adDay}`;
  } catch {
    return '';
  }
}

/**
 * Converts a valid AD date string (YYYY-MM-DD) or Date object to a BS date string (YYYY-MM-DD).
 * Returns empty string if invalid or out of range.
 */
export function convertAdToBs(adDateInput) {
  if (!adDateInput) return '';

  let year, month, day;
  if (typeof adDateInput === 'string') {
    const parts = adDateInput.trim().replace(/\//g, '-').split('-');
    if (parts.length !== 3) return '';
    [year, month, day] = parts.map(Number);
  } else if (adDateInput instanceof Date) {
    year = adDateInput.getFullYear();
    month = adDateInput.getMonth() + 1;
    day = adDateInput.getDate();
  }

  if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) return '';
  if (year < 1944 || year > 2033 || month < 1 || month > 12 || day < 1 || day > 31) return '';

  try {
    const jsDate = new Date(year, month - 1, day);
    if (isNaN(jsDate.getTime())) return '';

    const nd = new NepaliDate(jsDate);
    return nd.format('YYYY-MM-DD');
  } catch {
    return '';
  }
}

