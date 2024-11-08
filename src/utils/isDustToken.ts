import type PortfolioAsset from '@/types/PortfolioAsset';

export function isDustToken(
  asset: PortfolioAsset,
  valueThreshold: number = 1,
  amountThreshold: number = 0.01,
): boolean {
  return +asset.usd_value < valueThreshold || +asset.amount < amountThreshold;
}

export default isDustToken;
