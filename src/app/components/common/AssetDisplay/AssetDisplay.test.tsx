import { render, screen } from '@testing-library/react';
import AssetDisplay from './AssetDisplay';

describe('AssetDisplay', () => {
  const defaultProps = {
    symbol: 'BTC',
    label: 'Bitcoin',
    iconUrl: '/images/btc-icon.png',
  };

  it('renders the component with all required props', () => {
    render(<AssetDisplay {...defaultProps} />);

    // Check if symbol is rendered
    expect(screen.getByText('BTC')).toBeInTheDocument();

    // Check if label is rendered
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();

    // Check if image is rendered with correct attributes
    const image = screen.getByAltText('BTC icon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('width', '21');
    expect(image).toHaveAttribute('height', '21');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<AssetDisplay {...defaultProps} className={customClass} />);

    const container = screen.getByTestId('asset-display');
    expect(container).toHaveClass(customClass);
  });

  it('maintains default styling even with custom className', () => {
    const customClass = 'custom-class';
    render(<AssetDisplay {...defaultProps} className={customClass} />);

    const container = screen.getByTestId('asset-display');
    expect(container).toHaveClass('flex', 'items-center', 'gap-2', customClass);
  });
});
