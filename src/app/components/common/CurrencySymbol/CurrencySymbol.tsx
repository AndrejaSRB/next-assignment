import type Currency from '@/types/Currency';

const symbol: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
};

/**
 * Displays the currency symbol for a given currency
 * @param currency - The currency to display the symbol
 * @returns A span element containing the currency symbol
 * @example
 * <CurrencySymbol currency={Currency.USD} /> // renders "$"
 */

const CurrencySymbol = ({ currency }: { currency: Currency }) => {
  return <span>{symbol[currency]}</span>;
};

export default CurrencySymbol;
