import AssetDisplay from '@/app/components/common/AssetDisplay/AssetDisplay';
import DustToken from '../DustToken/DustToken';
import ValueDisplay from '@/app/components/common/ValueDisplay/ValueDisplay';
import Currency from '@/types/Currency';
import clsxm from '@/utils/clsxm';

type HoldingRowDataDisplayProps = {
  symbol?: string;
  label?: string;
  iconUrl?: string;
  totalValue?: string;
  amount?: string;
  dustAmount?: number;
  isExpanded?: boolean;
  hasDustTokens?: boolean;
  isDust?: boolean;
};

const HoldingRowDataDisplay = ({
  symbol,
  label,
  iconUrl,
  totalValue,
  amount,
  dustAmount,
  isExpanded = false,
  hasDustTokens = false,
  isDust = false,
}: HoldingRowDataDisplayProps) => (
  <div
    className={clsxm(
      'flex cursor-pointer items-center justify-between',
      typeof dustAmount === 'number' && 'px-2',
    )}
  >
    <div className="w-1/3 flex-shrink-0">
      {typeof dustAmount === 'number' ? (
        <DustToken amount={dustAmount} />
      ) : (
        <AssetDisplay
          symbol={symbol ?? ''}
          label={label ?? ''}
          iconUrl={iconUrl ?? ''}
          className={clsxm(isExpanded && 'ml-2')}
          hasDustTokens={hasDustTokens || isDust}
        />
      )}
    </div>

    <div className="w-1/3 flex-shrink-0">
      <ValueDisplay
        value={totalValue ? +totalValue : 0}
        currency={Currency.USD}
        size="sm"
      />
    </div>

    <div className="w-1/3 flex-shrink-0">
      {typeof dustAmount !== 'number' && (
        <ValueDisplay
          value={amount ? +amount : 0}
          size="sm"
          decimals={4}
          highlightDecimals={false}
          showCurrency={false}
        />
      )}
    </div>
  </div>
);

export default HoldingRowDataDisplay;
