import getDustTokens from './getDustTokens';
import type PortfolioAsset from '@/types/PortfolioAsset';

const mockAssets: PortfolioAsset[] = [
  {
    token_name: 'MirthMoney',
    token_symbol: 'MIRTH',
    chain_type: 'EVM',
    chain_id: 'arb',
    amount: '1000000000',
    usd_value: '0',
    token_address: '0xce12bb556677709afb58347a9ad38c8503c8288a',
    decimals: '18',
    price_usd: '0',
    snapshot_date: '2024-11-07T10:37:45.064623168Z',
    logo: 'https://static.debank.com/image/arb_token/logo_url/0xce12bb556677709afb58347a9ad38c8503c8288a/82fc84b2df845e106b662f41de45a052.png',
    extra_data: null,
  },
  {
    token_name: 'SOS',
    token_symbol: 'SOS',
    chain_type: 'EVM',
    chain_id: 'eth',
    amount: '1511875.2754',
    usd_value: '0.014456038727205798',
    token_address: '0x3b484b82567a09e2588a13d54d032153f0c0aee0',
    decimals: '18',
    price_usd: '0.000000009561660913716004',
    snapshot_date: '2024-11-07T10:37:45.064623168Z',
    logo: 'https://static.debank.com/image/eth_token/logo_url/0x3b484b82567a09e2588a13d54d032153f0c0aee0/784b93c4c0bada7cbf8c6570c7db7bfe.png',
    extra_data: null,
  },
];

describe('getDustTokens', () => {
  it('should filter tokens below default value threshold (1 USD)', () => {
    const dustTokens = getDustTokens(mockAssets);
    expect(dustTokens).toHaveLength(2);
    expect(dustTokens.map((token) => token.token_symbol)).toEqual([
      'MIRTH',
      'SOS',
    ]);
    expect(dustTokens.map((token) => token.usd_value)).toEqual([
      '0',
      '0.014456038727205798',
    ]);
  });

  it('should filter tokens using custom value threshold (0.01 USD)', () => {
    const dustTokens = getDustTokens(mockAssets, 0.01);
    expect(dustTokens).toHaveLength(1);
    expect(dustTokens[0].token_symbol).toBe('MIRTH');
    expect(dustTokens[0].usd_value).toBe('0');
  });

  it('should handle empty array input', () => {
    const dustTokens = getDustTokens([]);
    expect(dustTokens).toHaveLength(0);
    expect(dustTokens).toEqual([]);
  });

  it('should use both value and amount thresholds', () => {
    // Setting value threshold to 0.015 USD and amount threshold to 1000000
    const dustTokens = getDustTokens(mockAssets, 0.015, 1000000);
    expect(dustTokens).toHaveLength(2);
    expect(dustTokens.map((token) => token.token_symbol)).toEqual([
      'MIRTH',
      'SOS',
    ]);
  });
});
