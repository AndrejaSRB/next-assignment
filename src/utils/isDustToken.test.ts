import { isDustToken } from './isDustToken';
import type PortfolioAsset from '@/types/PortfolioAsset';

const mockedDustAssets = {
  token_name: 'SAND',
  token_symbol: 'SAND',
  chain_type: 'EVM',
  chain_id: 'matic',
  token_address: '0xbbba073c31bf03b8acf7c28ef0738decf3695683',
  decimals: '18',
  price_usd: '0.25394101577972694',
  snapshot_date: '2024-11-07T10:37:45.064623168Z',
  logo: 'https://static.debank.com/image/matic_token/logo_url/0xbbba073c31bf03b8acf7c28ef0738decf3695683/81853b2ea8c205afa8ebbdf213637520.png',
  extra_data: null,
};

describe('isDustToken', () => {
  // Helper function to create test assets
  const createAsset = (usdValue: string, amount: string): PortfolioAsset => ({
    ...mockedDustAssets,
    usd_value: usdValue,
    amount,
  });

  test('returns true when USD value is below default threshold', () => {
    const asset = createAsset('0.5', '1.0');
    expect(isDustToken(asset)).toBe(true);
  });

  test('returns true when amount is below default threshold', () => {
    const asset = createAsset('10.0', '0.009');
    expect(isDustToken(asset)).toBe(true);
  });

  test('returns false when both value and amount are above default thresholds', () => {
    const asset = createAsset('1.5', '0.02');
    expect(isDustToken(asset)).toBe(false);
  });

  test('respects custom value threshold', () => {
    const asset = createAsset('2.5', '1.0');
    expect(isDustToken(asset, 3)).toBe(true);
    expect(isDustToken(asset, 2)).toBe(false);
  });

  test('respects custom amount threshold', () => {
    const asset = createAsset('10.0', '0.05');
    expect(isDustToken(asset, 1, 0.1)).toBe(true);
    expect(isDustToken(asset, 1, 0.03)).toBe(false);
  });

  test('handles string values correctly', () => {
    const asset = createAsset('0.5', '0.005');
    expect(isDustToken(asset)).toBe(true);
  });
});
