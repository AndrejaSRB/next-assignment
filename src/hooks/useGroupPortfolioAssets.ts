'use client';

import { useState, useMemo } from 'react';
import type PortfolioAsset from '@/types/PortfolioAsset';
import groupBy from '@/utils/groupBy';
import isDustToken from '@/utils/isDustToken';
import type PortfolioSortField from '@/types/PortfolioSortField';
import type SortDirection from '@/types/SortDirection';

export type GroupedAsset = {
  symbol: string;
  assets: PortfolioAsset[];
  totalValue: number;
  totalAmount: number;
  hasDustTokens: boolean;
  isDustGroup: boolean;
};

type GroupedPortfolioAssetsReturnType = {
  /* Grouped assets by symbol */
  groupedData: Record<string, GroupedAsset>;
  /* Current sort field */
  sortField: PortfolioSortField;
  /* Current sort direction */
  sortDirection: SortDirection;
  /* Toggle sort field */
  toggleSort: (field: 'value' | 'amount') => void;
};

export default function useGroupPortfolioAssets(
  assets: PortfolioAsset[],
  searchQuery: string = '',
): GroupedPortfolioAssetsReturnType {
  // State management for sorting
  const [sortField, setSortField] = useState<PortfolioSortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Main data processing logic wrapped in useMemo for performance
  const groupedData = useMemo(() => {
    // STEP 1: Filter assets based on search query
    const filteredAssets = assets.filter((asset) => {
      if (!searchQuery.trim()) return true;
      const searchTerm = searchQuery.toLowerCase().trim();
      const symbol = asset.token_symbol.toLowerCase();
      const name = asset.token_name.toLowerCase();
      return symbol.includes(searchTerm) || name.includes(searchTerm);
    });

    // STEP 2: Initial grouping of assets by token symbol
    const initialGrouped = groupBy(
      filteredAssets,
      ({ token_symbol }) => token_symbol,
    );

    // STEP 3: Process groups and handle dust tokens
    const processedGroups: Record<string, GroupedAsset> = {};
    const dustOnlyTokens: PortfolioAsset[] = [];

    // Process each group of assets - calculate totals and check dust status
    Object.entries(initialGrouped).forEach(([symbol, groupAssets]) => {
      const totalValue = groupAssets.reduce(
        (sum, asset) => sum + parseFloat(asset.usd_value),
        0,
      );
      const totalAmount = groupAssets.reduce(
        (sum, asset) => sum + parseFloat(asset.amount),
        0,
      );
      const hasDustTokens = groupAssets.some((asset) => isDustToken(asset));
      const allDust = groupAssets.every((asset) => isDustToken(asset));

      // Either add to regular groups or collect dust tokens
      if (allDust && !searchQuery) {
        dustOnlyTokens.push(...groupAssets);
      } else {
        processedGroups[symbol] = {
          symbol,
          assets: groupAssets,
          totalValue,
          totalAmount,
          hasDustTokens,
          isDustGroup: false,
        };
      }
    });

    // STEP 4: Create special dust group if needed
    if (dustOnlyTokens.length > 0 && !searchQuery) {
      const totalDustValue = dustOnlyTokens.reduce(
        (sum, token) => sum + parseFloat(token.usd_value),
        0,
      );

      processedGroups['dust'] = {
        symbol: 'dust',
        assets: dustOnlyTokens,
        totalValue: totalDustValue,
        totalAmount: dustOnlyTokens.length,
        hasDustTokens: true,
        isDustGroup: true,
      };
    }

    // STEP 5: Sort the processed groups
    const sortedEntries = Object.entries(processedGroups).sort(
      ([keyA, a], [keyB, b]) => {
        // If no explicit sorting is applied (initial state), put dust group at the end
        if (!sortField && keyA === 'dust') return 1;
        if (!sortField && keyB === 'dust') return -1;

        // Sort by selected field and direction
        // Default sort by value
        const multiplier = sortDirection === 'desc' ? -1 : 1;
        if (sortField === 'value') {
          return (a.totalValue - b.totalValue) * multiplier;
        }
        if (sortField === 'amount') {
          return (a.totalAmount - b.totalAmount) * multiplier;
        }
        // Default sorting by value if no sort field is specified
        return (a.totalValue - b.totalValue) * -1;
      },
    );

    return Object.fromEntries(sortedEntries);
  }, [assets, searchQuery, sortField, sortDirection]);

  // Sort toggling function
  const toggleSort = (field: 'value' | 'amount') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return {
    groupedData,
    sortField,
    sortDirection,
    toggleSort,
  };
}
