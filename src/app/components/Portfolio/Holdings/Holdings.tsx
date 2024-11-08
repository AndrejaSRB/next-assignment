'use client';

import Card from '@/app/components/common/Card/Card';
import HoldingHeader from './HoldingHeader/HoldingHeader';
import HoldingRow from './HoldingRow/HoldingRow';
import type PortfolioAsset from '@/types/PortfolioAsset';
import { useState } from 'react';
import useGroupPortfolioAssets from '@/hooks/useGroupPortfolioAssets';
import SearchInput from './SearchInput /SearchInput';

type HoldingsProps = {
  assets: PortfolioAsset[];
};

const Holdings = ({ assets }: HoldingsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { groupedData, sortField, sortDirection, toggleSort } =
    useGroupPortfolioAssets(assets, searchQuery);

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
          {Object.values(groupedData).map((group) => (
            <HoldingRow
              key={group.symbol}
              assets={group.assets}
              isDustGroup={group.isDustGroup}
              hasDustTokens={group.hasDustTokens}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Holdings;
