import Currency from '@/types/Currency';
import splitFormattedNumber from '@/utils/splitFormattedNumber';
import CurrencySymbol from '../CurrencySymbol/CurrencySymbol';

type ValueDisplaySize = 'sm' | 'lg';

type ValueDisplayProps = {
  value: number;
  currency?: Currency;
  size: ValueDisplaySize;
  showCurrency?: boolean;
  decimals?: number;
  highlightDecimals?: boolean;
};

const large = 'text-4xl';
const small = 'text-md';
const largeDecimal = 'text-white/25 text-xl';
const smallDecimal = 'text-white/25 text-sm';

const ValueDisplay = ({
  value,
  currency = Currency.USD,
  size = 'sm',
  showCurrency = true,
  decimals = 2,
  highlightDecimals = true,
}: ValueDisplayProps) => {
  const { wholeNumber, decimalPart } = splitFormattedNumber(value, decimals);

  return (
    <p className={size === 'lg' ? large : small} data-testid="value-display">
      {showCurrency && <CurrencySymbol currency={currency} />}

      <span>{wholeNumber}</span>

      <span
        className={
          highlightDecimals
            ? size === 'lg'
              ? largeDecimal
              : smallDecimal
            : undefined
        }
      >
        .{decimalPart}
      </span>
    </p>
  );
};

export default ValueDisplay;
