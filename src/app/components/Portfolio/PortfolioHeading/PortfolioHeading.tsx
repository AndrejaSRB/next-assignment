import Currency from '@/types/Currency';
import ValueDisplay from '../../common/ValueDisplay/ValueDisplay';
import TrendIndicator from '../../common/TrendIndicator/TrendIndicator';

type PortfolioHeadingProps = {
  totalValue: number;
  percentageChange: number;
  usdChange: number;
};

const PortfolioHeading = ({
  totalValue,
  percentageChange,
  usdChange,
}: PortfolioHeadingProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-end gap-2">
      <ValueDisplay value={totalValue} currency={Currency.USD} size="lg" />

      <TrendIndicator value={percentageChange} />
    </div>

    <p className="text-md leading-14 text-customGray">
      Your total portfolio is {usdChange >= 0 ? 'up' : 'down'}{' '}
      <span className="text-white">
        {usdChange >= 0 ? '$' : '-$'}

        {Math.abs(usdChange).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>{' '}
      in last <span className="text-white">24hrs</span>
    </p>
  </div>
);

export default PortfolioHeading;
