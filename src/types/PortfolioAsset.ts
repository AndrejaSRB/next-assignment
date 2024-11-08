type PortfolioAsset = {
  token_name: string;
  token_symbol: string;
  chain_type: string;
  chain_id: string;
  amount: string;
  usd_value: string;
  token_address: string;
  decimals: string;
  price_usd: string;
  snapshot_date: string;
  logo: string;
  extra_data: unknown | null;
};

export default PortfolioAsset;
