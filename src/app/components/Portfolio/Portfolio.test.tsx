import { render, screen, within } from '@testing-library/react';
import Portfolio from '../Portfolio/Portfolio';
import env from '@/lib/env';
import { createServer } from '@/test/server';
import type PortfolioData from '@/types/PortfolioData';

// Mock sample data
const mockPortfolioData: PortfolioData = {
  total_usd_value: 15000.5,
  wallet_address: '0x7f3B192Ab3220940D66236792F3EBDB0e4E74138',
  chain_type: 'EVM',
  portfolio_change: {
    '24hr': {
      percentage_change: 2.5,
      usd_change: 175.75782871142655,
      change_direction: 'positive',
    },
  },
  assets: [
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
  ],
};

// Setup MSW server using the new createServer utility
createServer<PortfolioData>([
  {
    url: `${env.NEXT_PUBLIC_API_URL}/portfolio`,
    method: 'get',
    res: () => mockPortfolioData,
  },
]);

describe('Portfolio', () => {
  it('renders portfolio data correctly', async () => {
    render(await Portfolio());

    const valueDisplay = screen.getAllByTestId('value-display');
    // There are 3 value displays in the heading (title, and two amounts)
    expect(valueDisplay).toHaveLength(3);
    // Test if total value is rendered

    // Expect heading total usd value to be 15,000, to have $ sign and to have 2 decimals
    expect(within(valueDisplay[0]).getByText('15,000')).toBeInTheDocument();
    expect(within(valueDisplay[0]).getByText('$')).toBeInTheDocument();
    expect(within(valueDisplay[0]).getByText('.50')).toBeInTheDocument();

    // Test if percentage change is rendered
    expect(screen.getByText('2.5%')).toBeInTheDocument();
    // Expect trending up icon to be rendered
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();

    // Test if assets are rendered
    expect(screen.getByText('ETH')).toBeInTheDocument();
  });
});
