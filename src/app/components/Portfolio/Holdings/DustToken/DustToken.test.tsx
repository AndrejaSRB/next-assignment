import { render, screen } from '@testing-library/react';
import DustToken from './DustToken';

// Mock the DustIcon SVG component
jest.mock('public/dust-image.svg', () => ({
  __esModule: true,
  default: () => <div data-testid="dust-icon" />,
}));

describe('DustToken', () => {
  it('renders single dust icon when amount is 1', () => {
    render(<DustToken amount={1} />);

    const dustIcons = screen.getAllByTestId('dust-icon');
    expect(dustIcons).toHaveLength(1);
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  it('renders three dust icons when amount is 3', () => {
    render(<DustToken amount={3} />);

    const dustIcons = screen.getAllByTestId('dust-icon');
    expect(dustIcons).toHaveLength(3);
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  it('renders three dust icons and "+X" text when amount is greater than 3', () => {
    render(<DustToken amount={5} />);

    const dustIcons = screen.getAllByTestId('dust-icon');
    expect(dustIcons).toHaveLength(3);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders "Dust tokens" text and information icon', () => {
    render(<DustToken amount={1} />);

    expect(screen.getByText('Dust tokens')).toBeInTheDocument();

    expect(
      screen.getByTestId('dust-token-information-icon'),
    ).toBeInTheDocument();
  });
});
