import { render, screen } from '@testing-library/react';
import PortfolioHeading from './PortfolioHeading';

describe('PortfolioHeading', () => {
  const defaultProps = {
    totalValue: 50000,
    percentageChange: 2.5,
    usdChange: 7296.0,
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

  it('renders positive portfolio change text correctly', () => {
    render(<PortfolioHeading {...defaultProps} />);

    expect(screen.getByText(/your total portfolio is up/i)).toBeInTheDocument();
    expect(screen.getByText('$7,296.00')).toBeInTheDocument();
    expect(screen.getByText('24hrs')).toBeInTheDocument();
  });

  it('renders negative portfolio change text correctly', () => {
    render(
      <PortfolioHeading
        {...defaultProps}
        percentageChange={-2.5}
        usdChange={-7296.0}
      />,
    );

    expect(
      screen.getByText(/your total portfolio is down/i),
    ).toBeInTheDocument();
    expect(screen.getByText('-$7,296.00')).toBeInTheDocument();
  });
});
