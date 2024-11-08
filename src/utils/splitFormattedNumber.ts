/**
 * Splits a number into whole number and decimal parts with proper formatting
 * @param value - The number to be formatted and split
 * @param decimals - Number of decimal places to show (defaults to 2)
 *
 * @returns Object containing the formatted whole number and decimal parts
 * @example
 * splitFormattedNumber(1234.567, 2) // returns { wholeNumber: "1,234", decimalPart: "57" }
 */

const splitFormattedNumber = (
  value: number,
  decimals: number = 2,
): { wholeNumber: string; decimalPart: string } => {
  const parts = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(value)
    .split('.');

  return {
    wholeNumber: parts[0],
    decimalPart: parts[1] || '00',
  };
};

export default splitFormattedNumber;
