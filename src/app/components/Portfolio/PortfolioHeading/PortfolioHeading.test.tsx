import { render, screen } from '@testing-library/react';
import PortfolioHeading from './PortfolioHeading';

describe('PortfolioHeading', () => {
  const defaultProps = {
    totalValue: 50000,
    percentageChange: 2.5,
  };

  it('renders the total value correctly', () => {
    render(<PortfolioHeading {...defaultProps} />);

    const valueDisplay = screen.getByTestId('value-display');
    expect(valueDisplay).toHaveTextContent('$');
    expect(valueDisplay).toHaveTextContent('50,000');
    expect(valueDisplay).toHaveTextContent('.00');
  });

  it('renders the percentage change indicator', () => {
    render(<PortfolioHeading {...defaultProps} />);

    expect(screen.getByText('2.5%')).toBeInTheDocument();
  });

  it('renders the portfolio summary text', () => {
    render(<PortfolioHeading {...defaultProps} />);

    expect(screen.getByText(/your total portfolio is up/i)).toBeInTheDocument();
    expect(screen.getByText('$7,296')).toBeInTheDocument();
    expect(screen.getByText('24hrs')).toBeInTheDocument();
  });

  it('renders with negative percentage change', () => {
    render(<PortfolioHeading {...defaultProps} percentageChange={-2.5} />);

    expect(screen.getByText('-2.5%')).toBeInTheDocument();
  });
});
