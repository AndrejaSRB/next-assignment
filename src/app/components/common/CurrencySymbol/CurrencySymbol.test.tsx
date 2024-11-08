import { render, screen } from '@testing-library/react';
import CurrencySymbol from './CurrencySymbol';
import Currency from '@/types/Currency';

const renderComponent = (currency: Currency) =>
  render(<CurrencySymbol currency={currency} />);

describe('CurrencySymbol', () => {
  it('renders USD symbol correctly', () => {
    renderComponent(Currency.USD);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders EUR symbol correctly', () => {
    renderComponent(Currency.EUR);
    expect(screen.getByText('€')).toBeInTheDocument();
  });
});
