import splitFormattedNumber from '@/utils/splitFormattedNumber';

describe('splitFormattedNumber', () => {
  it('should format whole numbers correctly', () => {
    const result = splitFormattedNumber(1234);
    expect(result).toEqual({
      wholeNumber: '1,234',
      decimalPart: '00',
    });
  });

  it('should format decimal numbers with default 2 decimal places', () => {
    const result = splitFormattedNumber(1234.567);
    expect(result).toEqual({
      wholeNumber: '1,234',
      decimalPart: '57',
    });
  });

  it('should handle custom decimal places', () => {
    const result = splitFormattedNumber(1234.567, 3);
    expect(result).toEqual({
      wholeNumber: '1,234',
      decimalPart: '567',
    });
  });

  it('should format large numbers with thousand separators', () => {
    const result = splitFormattedNumber(1234567.89);
    expect(result).toEqual({
      wholeNumber: '1,234,567',
      decimalPart: '89',
    });
  });

  it('should handle zero correctly', () => {
    const result = splitFormattedNumber(0);
    expect(result).toEqual({
      wholeNumber: '0',
      decimalPart: '00',
    });
  });

  it('should handle negative numbers', () => {
    const result = splitFormattedNumber(-1234.56);
    expect(result).toEqual({
      wholeNumber: '-1,234',
      decimalPart: '56',
    });
  });

  it('should round numbers according to decimal places', () => {
    const result = splitFormattedNumber(1234.567, 2);
    expect(result).toEqual({
      wholeNumber: '1,234',
      decimalPart: '57',
    });
  });

  it('should handle very small decimal numbers', () => {
    const result = splitFormattedNumber(0.00123, 5);
    expect(result).toEqual({
      wholeNumber: '0',
      decimalPart: '00123',
    });
  });

  it('should handle very large numbers', () => {
    const result = splitFormattedNumber(1234567890.12);
    expect(result).toEqual({
      wholeNumber: '1,234,567,890',
      decimalPart: '12',
    });
  });
});
