'use client';
import type PortfolioAsset from '@/types/PortfolioAsset';
import getDustTokens from '@/utils/getDustTokens';

export default function useGroupPortfolioAssets(assets: PortfolioAsset[]) {
  const dustTokens = getDustTokens(assets);
  const nonDustTokens = assets.filter(
    (asset) =>
      !dustTokens.some((dust) => dust.token_address === asset.token_address),
  );

  // Calculate the total USD value of dust tokens
  const totalDustValue = dustTokens.reduce(
    (sum, token) => sum + parseFloat(token.usd_value),
    0,
  );

  const groupedAssets = Object.groupBy(
    nonDustTokens,
    ({ token_symbol }) => token_symbol,
  );

  return { groupedAssets, totalDustValue, dustTokens };
}
