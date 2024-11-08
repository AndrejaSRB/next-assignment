import Currency from '@/types/Currency';
import ValueDisplay from '../../common/ValueDisplay/ValueDisplay';
import TrendIndicator from '../../common/TrendIndicator/TrendIndicator';

type PortfolioHeadingProps = {
  totalValue: number;
  percentageChange: number;
};

const PortfolioHeading = ({
  totalValue,
  percentageChange,
}: PortfolioHeadingProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-end gap-2">
      <ValueDisplay value={totalValue} currency={Currency.USD} size="lg" />

      <TrendIndicator value={percentageChange} />
    </div>

    <p className="text-md text-customGray">
      Your total portfolio is up <span className="text-white">$7,296</span> in
      last <span className="text-white">24hrs</span>
    </p>
  </div>
);

export default PortfolioHeading;
