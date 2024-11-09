'use client';

import { useState } from 'react';
import type PortfolioAsset from '@/types/PortfolioAsset';
import HoldingRowDataDisplay from '../HoldingRowDataDisplay/HoldingRowDataDisplay';
import clsxm from '@/utils/clsxm';
import isDustToken from '@/utils/isDustToken';

type HoldingRowProps = {
  assets: PortfolioAsset[];
  isDustGroup?: boolean;
  hasDustTokens?: boolean;
};

const HoldingRow = ({
  assets,
  isDustGroup = false,
  hasDustTokens = false,
}: HoldingRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const first = assets[0];

  const hasMultipleAssets = assets.length > 1;

  const totalValue = assets.reduce(
    (sum, asset) => sum + parseFloat(asset.usd_value),
    0,
  );
  const totalAmount = assets.reduce(
    (sum, asset) => sum + parseFloat(asset.amount),
    0,
  );

  return (
    <>
      <div
        data-testid="holding-row"
        onClick={() => hasMultipleAssets && setIsExpanded(!isExpanded)}
        className={clsxm(
          'cursor-pointer justify-between rounded-xl p-2 transition-all duration-200',
          isExpanded && 'bg-customDarkerGray',
          !isExpanded && 'lg:hover:bg-customDarkerGray',
          hasMultipleAssets && 'cursor-pointer',
        )}
      >
        {isDustGroup ? (
          <HoldingRowDataDisplay
            dustAmount={assets.length}
            totalValue={totalValue.toString()}
          />
        ) : (
          <HoldingRowDataDisplay
            symbol={first.token_symbol}
            label={
              hasMultipleAssets ? `${assets.length} chains` : first.chain_id
            }
            iconUrl={first.logo}
            totalValue={totalValue.toString()}
            amount={totalAmount.toString()}
            hasDustTokens={hasDustTokens}
          />
        )}

        {isExpanded && hasMultipleAssets && (
          <div className="bg-customDarkerGray">
            <div className="my-[10px] border border-white border-opacity-5" />

            <p className="mb-[10px] text-sm text-white/55">Breakdown</p>

            <div className="flex flex-col gap-2">
              {assets.map((asset, index) => {
                const isDust = isDustToken(asset);
                return (
                  <HoldingRowDataDisplay
                    key={`${asset.token_symbol}-${asset.chain_id}-${index}`}
                    symbol={asset.token_symbol}
                    label={asset.chain_id}
                    iconUrl={asset.logo}
                    totalValue={asset.usd_value}
                    amount={asset.amount}
                    isExpanded={isExpanded}
                    isDust={isDust}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HoldingRow;
