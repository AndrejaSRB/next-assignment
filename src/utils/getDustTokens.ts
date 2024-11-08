import type PortfolioAsset from '@/types/PortfolioAsset';

/**
 * Filters an array of portfolio assets to identify "dust" tokens based on value thresholds
 * @param {PortfolioAsset[]} assets - Array of portfolio assets to filter
 * @param {number} [valueThreshold=1] - USD value threshold below which tokens are considered dust (default: $1)
 * @param {number} [amountThreshold=0.01] - Token amount threshold below which tokens are considered dust (default: 0.01)
 * @returns {PortfolioAsset[]} Array of portfolio assets that are considered dust tokens
 */

function getDustTokens(
  assets: PortfolioAsset[],
  valueThreshold: number = 1,
  amountThreshold: number = 0.01,
): PortfolioAsset[] {
  return assets.filter(
    (asset) =>
      +asset.usd_value < valueThreshold || +asset.usd_value < amountThreshold,
  );
}

export default getDustTokens;
