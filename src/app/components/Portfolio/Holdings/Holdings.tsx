'use client';
import Card from '@/app/components/common/Card/Card';
import HoldingHeader from './HoldingHeader';
import HoldingRow from './HoldingRow/HoldingRow';
import type PortfolioAsset from '@/types/PortfolioAsset';
import HoldingRowDataDisplay from './HoldingRowDataDisplay/HoldingRowDataDisplay';
import useGroupPortfolioAssets from '@/hooks/useGroupPortfolioAssets';

type PortfolioHoldingsProps = {
  assets: PortfolioAsset[];
};
const PortfolioHoldings = ({ assets }: PortfolioHoldingsProps) => {
  const { groupedAssets, totalDustValue, dustTokens } =
    useGroupPortfolioAssets(assets);

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Holdings</h1>

        <HoldingHeader />

        <div className="flex flex-col gap-1">
          {Object.keys(groupedAssets).map((symbol) => {
            return (
              <HoldingRow
                key={`${symbol}-holdings`}
                assets={groupedAssets[symbol]}
              />
            );
          })}

          <HoldingRowDataDisplay
            dustAmount={dustTokens?.length}
            totalValue={totalDustValue.toString()}
          />
        </div>
      </div>
    </Card>
  );
};

export default PortfolioHoldings;
