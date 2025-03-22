export enum EDateFormat {
  ISO = "ISO", // YYYY-MM-DD
  YYYYMMDD = "YYYYMMDD", // YYYYMMDD
}

/**
 * formatDate function formats a date string into a specified format.
 *
 * It supports ISO (YYYY-MM-DD) and YYYYMMDD formats. If an unsupported format is provided,
 * it returns the original date string.
 *
 * @param date - The date string to format.
 * @param format - The desired date format (EDateFormat.ISO or EDateFormat.YYYYMMDD).
 * @returns The formatted date string.
 */
export const formatDate = (date: string, format: EDateFormat): string => {
  const dateObj = new Date(date);
  switch (format) {
    case EDateFormat.ISO:
      return dateObj.toISOString().split("T")[0];
    case EDateFormat.YYYYMMDD:
      return date.replace(/-/g, "");
    default:
      return date;
  }
};

/**
 * Usage example:
 *
 * import { formatDate, EDateFormat } from './date-utils';
 *
 * const isoDate = formatDate('2023-10-26', EDateFormat.ISO); // Returns '2023-10-26'
 * const yyyymmddDate = formatDate('2023-10-26', EDateFormat.YYYYMMDD); // Returns '20231026'
 * const originalDate = formatDate('2023-10-26', 'INVALID_FORMAT' as EDateFormat); // Returns '2023-10-26'
 */
