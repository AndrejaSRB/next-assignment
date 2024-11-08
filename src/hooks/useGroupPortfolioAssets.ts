'use client';
import { useState, useMemo } from 'react';
import type PortfolioAsset from '@/types/PortfolioAsset';
import getDustTokens from '@/utils/getDustTokens';
import groupBy from '@/utils/groupBy';

type SortField = 'value' | 'amount';
type SortDirection = 'asc' | 'desc';

type GroupedPortfolioAssetsReturnType = {
  /* Grouped assets by token symbol */
  groupedAssets: Record<string, PortfolioAsset[]>;
  /* Total value of dust tokens */
  totalDustValue: number;
  /* Array of dust tokens */
  dustTokens: PortfolioAsset[];
  /* Current sort field */
  sortField: SortField;
  /* Current sort direction */
  sortDirection: SortDirection;
  /* Function to toggle sort direction and field */
  toggleSort: (field: SortField) => void;
};

export default function useGroupPortfolioAssets(
  assets: PortfolioAsset[],
  searchQuery: string = '',
): GroupedPortfolioAssetsReturnType {
  // State for sorting functionality
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Separate dust tokens from main assets
  const dustTokens = getDustTokens(assets);
  const nonDustTokens = assets.filter(
    (asset) =>
      !dustTokens.some((dust) => dust.token_address === asset.token_address),
  );

  // Calculate total value of dust tokens
  const totalDustValue = dustTokens.reduce(
    (sum, token) => sum + parseFloat(token.usd_value),
    0,
  );

  // Group and sort assets with memoization
  const groupedAssets = useMemo(() => {
    // If searching, include all tokens in search
    if (searchQuery.trim()) {
      const allTokens = [...nonDustTokens, ...dustTokens];
      const filteredAssets = allTokens.filter((asset) => {
        const searchTerm = searchQuery.toLowerCase().trim();
        const symbol = asset.token_symbol.toLowerCase();
        const name = asset.token_name.toLowerCase();
        return symbol.startsWith(searchTerm) || name.startsWith(searchTerm);
      });

      return groupBy(
        filteredAssets,
        ({ token_symbol }) => token_symbol,
      ) as Record<string, PortfolioAsset[]>;
    }

    // If not searching, only sort non-dust tokens
    const grouped = groupBy(
      nonDustTokens,
      ({ token_symbol }) => token_symbol,
    ) as Record<string, PortfolioAsset[]>;

    // Convert grouped object to array for sorting
    const sortableArray = Object.entries(grouped).map(([symbol, assets]) => {
      const totalValue = assets?.reduce(
        (sum, asset) => sum + parseFloat(asset.usd_value),
        0,
      );
      const totalAmount = assets?.reduce(
        (sum, asset) => sum + parseFloat(asset.amount),
        0,
      );
      return { symbol, assets, totalValue, totalAmount };
    });

    // Sort array based on selected field and direction
    sortableArray.sort((a, b) => {
      const multiplier = sortDirection === 'desc' ? -1 : 1;

      if (sortField === 'value' && a?.totalValue && b?.totalValue) {
        return (a.totalValue - b.totalValue) * multiplier;
      }
      if (sortField === 'amount' && a?.totalAmount && b?.totalAmount) {
        return (a.totalAmount - b.totalAmount) * multiplier;
      }
      return 0;
    });

    // Convert sorted array back to object
    return Object.fromEntries(
      sortableArray
        .filter(({ assets }) => assets !== undefined)
        .map(({ symbol, assets }) => [symbol, assets]),
    ) as Record<string, PortfolioAsset[]>;
  }, [nonDustTokens, dustTokens, searchQuery, sortField, sortDirection]);

  // Toggle sort direction and field
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      // If clicking same field, toggle direction
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // If clicking new field, set it and default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return {
    groupedAssets,
    totalDustValue,
    dustTokens,
    sortField,
    sortDirection,
    toggleSort,
  };
}
