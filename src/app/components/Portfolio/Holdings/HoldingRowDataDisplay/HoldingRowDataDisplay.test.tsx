import { render, screen, within } from '@testing-library/react';
import HoldingRowDataDisplay from './HoldingRowDataDisplay';

// Mock the DustIcon SVG component
jest.mock('public/dust-image.svg', () => ({
  __esModule: true,
  default: () => <div data-testid="dust-icon" />,
}));

describe('HoldingRowDataDisplay', () => {
  const defaultProps = {
    symbol: 'BTC',
    label: 'Bitcoin',
    iconUrl: 'https://example.com/btc.png',
    totalValue: '50000.50',
    amount: '1.2346',
    dustAmount: undefined,
  };

  it('renders regular asset display correctly', () => {
    render(<HoldingRowDataDisplay {...defaultProps} />);

    const valueDisplays = screen.getAllByTestId('value-display');

    // Asset
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();

    // Total value
    expect(within(valueDisplays[0]).getByText('50,000')).toBeInTheDocument();
    expect(within(valueDisplays[0]).getByText('.50')).toBeInTheDocument();

    // Amount
    expect(within(valueDisplays[1]).getByText('1')).toBeInTheDocument();
    expect(within(valueDisplays[1]).getByText('.2346')).toBeInTheDocument();
  });

  it('renders dust token when dustAmount is provided', () => {
    render(<HoldingRowDataDisplay dustAmount={2} />);

    expect(screen.queryByText('BTC')).not.toBeInTheDocument();

    const dustIcons = screen.getAllByTestId('dust-icon');
    expect(dustIcons).toHaveLength(2);
  });

  it('applies expanded styling when isExpanded is true', () => {
    render(<HoldingRowDataDisplay {...defaultProps} isExpanded={true} />);

    const assetDisplay = screen.getAllByTestId('asset-display')[0];
    // Check if the AssetDisplay component has the expanded class
    expect(assetDisplay).toHaveClass('ml-2');
  });

  it('handles undefined values gracefully', () => {
    render(<HoldingRowDataDisplay />);

    const valueDisplays = screen.getAllByTestId('value-display');
    expect(valueDisplays).toHaveLength(2);

    const valueDisplay = valueDisplays[0];

    // Should render with empty/zero values without crashing
    expect(within(valueDisplay).getByText('0')).toBeInTheDocument();
    expect(within(valueDisplay).getByText('.00')).toBeInTheDocument();
  });
});
