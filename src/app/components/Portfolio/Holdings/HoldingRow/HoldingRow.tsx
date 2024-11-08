'use client';

import { useState } from 'react';
import type PortfolioAsset from '@/types/PortfolioAsset';
import HoldingRowDataDisplay from '../HoldingRowDataDisplay/HoldingRowDataDisplay';
import clsxm from '@/utils/clsxm';

type HoldingRowProps = {
  assets: PortfolioAsset[] | undefined;
};

const HoldingRow = ({ assets }: HoldingRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const first = assets?.[0];
  const hasMultipleAssets = (assets?.length ?? 0) > 1;

  return (
    <>
      <div
        onClick={() => hasMultipleAssets && setIsExpanded(!isExpanded)}
        className={clsxm(
          'cursor-pointer justify-between rounded-xl p-2 transition-all duration-200',
          isExpanded && 'bg-customDarkerGray',
          !isExpanded && 'hover:bg-customDarkerGray',
          hasMultipleAssets && 'cursor-pointer',
        )}
      >
        <HoldingRowDataDisplay
          symbol={first?.token_symbol}
          label={
            hasMultipleAssets ? `${assets?.length} chains` : first?.chain_id
          }
          iconUrl={first?.logo}
          totalValue={first?.usd_value}
          amount={first?.amount}
        />

        {isExpanded && hasMultipleAssets && (
          <div className="bg-customDarkerGray">
            <div className="my-[10px] border border-white border-opacity-5" />

            <p className="mb-[10px] text-sm text-white/55">Breakdown</p>

            <div className="flex flex-col gap-2">
              {assets
                ?.slice(1)
                .map((asset, index) => (
                  <HoldingRowDataDisplay
                    key={`${asset.token_symbol}-${asset.chain_id}-${index}`}
                    symbol={asset.token_symbol}
                    label={asset.chain_id}
                    iconUrl={asset.logo}
                    totalValue={asset.usd_value}
                    amount={asset.amount}
                    isExpanded={isExpanded}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HoldingRow;
