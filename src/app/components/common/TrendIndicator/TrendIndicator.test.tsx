import { render, screen } from '@testing-library/react';
import TrendIndicator from './TrendIndicator';

describe('TrendIndicator', () => {
  it('renders positive value with up arrow', () => {
    render(<TrendIndicator value={5.5} />);
    const icon = screen.getByTestId('trending-up-icon');

    expect(screen.getByText('5.5%')).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-trands-positive');
  });

  it('renders negative value with down arrow', () => {
    render(<TrendIndicator value={-3.2} />);

    const icon = screen.getByTestId('trending-down-icon');
    expect(screen.getByText('-3.2%')).toBeInTheDocument();

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-trands-negative');
  });

  it('formats decimal places correctly', () => {
    render(<TrendIndicator value={5.678} />);
    expect(screen.getByText('5.7%')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    render(<TrendIndicator value={0} />);
    const icon = screen.getByTestId('trending-down-icon');

    expect(screen.getByText('0.0%')).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-trands-negative');
  });
});
