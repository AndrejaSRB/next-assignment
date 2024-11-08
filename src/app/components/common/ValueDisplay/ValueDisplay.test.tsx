import { render, screen } from '@testing-library/react';
import ValueDisplay from './ValueDisplay';
import Currency from '@/types/Currency';

describe('ValueDisplay', () => {
  it('renders with default props', () => {
    render(<ValueDisplay value={123.45} currency={Currency.USD} size="sm" />);

    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('.45')).toBeInTheDocument();
  });

  it('renders large size correctly', () => {
    render(<ValueDisplay value={123.45} currency={Currency.USD} size="lg" />);

    const container = screen.getByRole('paragraph');
    expect(container).toHaveClass('text-4xl');
  });

  it('renders small size correctly', () => {
    render(<ValueDisplay value={123.45} currency={Currency.USD} size="sm" />);

    const container = screen.getByRole('paragraph');
    expect(container).toHaveClass('text-md');
  });

  it('hides currency symbol when showCurrency is false', () => {
    render(
      <ValueDisplay
        value={123.45}
        currency={Currency.USD}
        size="sm"
        showCurrency={false}
      />,
    );

    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });

  it('displays correct number of decimals', () => {
    render(
      <ValueDisplay
        value={123.4567}
        currency={Currency.USD}
        size="sm"
        decimals={3}
      />,
    );

    expect(screen.getByText('.457')).toBeInTheDocument();
  });

  it('applies decimal highlighting correctly for large size', () => {
    render(<ValueDisplay value={123.45} currency={Currency.USD} size="lg" />);

    const decimalPart = screen.getByText('.45');
    expect(decimalPart).toHaveClass('text-white/25', 'text-xl');
  });

  it('applies decimal highlighting correctly for small size', () => {
    render(<ValueDisplay value={123.45} currency={Currency.USD} size="sm" />);

    const decimalPart = screen.getByText('.45');
    expect(decimalPart).toHaveClass('text-white/25', 'text-sm');
  });

  it('does not highlight decimals when highlightDecimals is false', () => {
    render(
      <ValueDisplay
        value={123.45}
        currency={Currency.USD}
        size="sm"
        highlightDecimals={false}
      />,
    );

    const decimalPart = screen.getByText('.45');
    expect(decimalPart).not.toHaveClass('text-white/25', 'text-sm');
  });
});
