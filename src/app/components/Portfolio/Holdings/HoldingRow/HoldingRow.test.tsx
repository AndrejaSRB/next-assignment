import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoldingRow from './HoldingRow';
import type PortfolioAsset from '@/types/PortfolioAsset';

const mockSingleAsset: PortfolioAsset[] = [
  {
    token_name: 'ETH',
    token_symbol: 'ETH',
    chain_type: 'EVM',
    chain_id: 'eth',
    amount: '0.018460817532744832',
    usd_value: '51.90535761594201',
    token_address: 'eth',
    decimals: '18',
    price_usd: '2811.65',
    snapshot_date: '2024-11-07T10:37:45.064623168Z',
    logo: 'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    extra_data: null,
  },
];

const mockMultipleAssets: PortfolioAsset[] = [
  {
    token_name: 'ETH',
    token_symbol: 'ETH',
    chain_type: 'EVM',
    chain_id: 'eth',
    amount: '0.018460817532744832',
    usd_value: '51.90535761594201',
    token_address: 'eth',
    decimals: '18',
    price_usd: '2811.65',
    snapshot_date: '2024-11-07T10:37:45.064623168Z',
    logo: 'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    extra_data: null,
  },
  {
    token_name: 'ETH',
    token_symbol: 'ETH',
    chain_type: 'EVM',
    chain_id: 'arb',
    amount: '0.000257036600944131',
    usd_value: '0.7226969590445659',
    token_address: 'arb',
    decimals: '18',
    price_usd: '2811.65',
    snapshot_date: '2024-11-07T10:37:45.064623168Z',
    logo: 'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    extra_data: null,
  },
];

describe('HoldingRow', () => {
  it('renders single asset correctly', () => {
    render(<HoldingRow assets={mockSingleAsset} />);

    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'ETH icon' })).toBeInTheDocument();
    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });

  it('renders multiple assets with collapsed view', () => {
    render(<HoldingRow assets={mockMultipleAssets} />);

    expect(screen.getByText('2 chains')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });

  it('expands to show all assets when clicked with multiple assets', async () => {
    render(<HoldingRow assets={mockMultipleAssets} />);

    const rowElement = screen.getByTestId('holding-row');
    await userEvent.click(rowElement);

    expect(screen.getByText('Breakdown')).toBeInTheDocument();
    expect(screen.getByText('arb')).toBeInTheDocument();
  });

  it('does not expand when clicked with single asset', async () => {
    render(<HoldingRow assets={mockSingleAsset} />);

    const rowElement = screen.getByTestId('holding-row');
    await userEvent.click(rowElement);

    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });

  it('handles undefined assets gracefully', () => {
    render(<HoldingRow assets={undefined} />);

    expect(screen.queryByText('chains')).not.toBeInTheDocument();
  });

  it('toggles expansion state correctly', async () => {
    render(<HoldingRow assets={mockMultipleAssets} />);

    const rowElement = screen.getByTestId('holding-row');
    // First click to expand
    await userEvent.click(rowElement);
    expect(screen.getByText('Breakdown')).toBeInTheDocument();

    // Second click to collapse
    await userEvent.click(rowElement);
    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });
});
