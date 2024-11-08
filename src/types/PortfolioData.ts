import type PortfolioAsset from './PortfolioAsset';

type PortfolioData = {
  wallet_address: string;
  chain_type: string;
  total_usd_value: number;
  portfolio_change: {
    '24hr': {
      usd_change: number;
      percentage_change: number;
      change_direction: 'positive' | 'negative';
    };
  };
  assets: PortfolioAsset[];
};

export default PortfolioData;
