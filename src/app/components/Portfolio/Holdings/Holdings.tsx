'use client';
import Card from '@/app/components/common/Card/Card';
import HoldingHeader from './HoldingHeader/HoldingHeader';
import HoldingRow from './HoldingRow/HoldingRow';
import type PortfolioAsset from '@/types/PortfolioAsset';
import HoldingRowDataDisplay from './HoldingRowDataDisplay/HoldingRowDataDisplay';
import useGroupPortfolioAssets from '@/hooks/useGroupPortfolioAssets';
import SearchInput from './SearchInput /SearchInput';
import { useState } from 'react';

type PortfolioHoldingsProps = {
  assets: PortfolioAsset[];
};
const PortfolioHoldings = ({ assets }: PortfolioHoldingsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    groupedAssets,
    totalDustValue,
    dustTokens,
    sortField,
    sortDirection,
    toggleSort,
  } = useGroupPortfolioAssets(assets, searchQuery);

  // Check if we're currently searching
  const isSearching = searchQuery.trim() !== '';

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Holdings</h1>

          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <HoldingHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={toggleSort}
        />

        <div className="flex flex-col gap-1">
          {/* We are displaying all tokens even dust ones when we are searching */}
          {Object.keys(groupedAssets).map((symbol) => {
            return (
              <HoldingRow
                key={`${symbol}-holdings`}
                assets={groupedAssets[symbol]}
              />
            );
          })}

          {/* Only show dust summary when not searching */}
          {!isSearching && dustTokens.length > 0 && (
            <HoldingRowDataDisplay
              dustAmount={dustTokens.length}
              totalValue={totalDustValue.toString()}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default PortfolioHoldings;
