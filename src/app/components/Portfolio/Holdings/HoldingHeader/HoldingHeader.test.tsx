import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoldingHeader from './HoldingHeader';

describe('HoldingHeader', () => {
  const mockOnSort = jest.fn();
  const defaultProps = {
    sortField: 'value' as const,
    sortDirection: 'desc' as const,
    onSort: mockOnSort,
  };

  beforeEach(() => {
    mockOnSort.mockClear();
  });

  it('renders all column headers correctly', () => {
    render(<HoldingHeader {...defaultProps} />);

    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('Total value')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('applies correct styles to active sort field (value)', () => {
    render(<HoldingHeader {...defaultProps} />);

    const totalValueText = screen.getByText('Total value');
    const amountText = screen.getByText('Amount');

    expect(totalValueText).toHaveClass('text-white');
    expect(amountText).toHaveClass('text-white/55');
  });

  it('applies correct styles to active sort field (amount)', () => {
    render(<HoldingHeader {...defaultProps} sortField="amount" />);

    const totalValueText = screen.getByText('Total value');
    const amountText = screen.getByText('Amount');

    expect(totalValueText).toHaveClass('text-white/55');
    expect(amountText).toHaveClass('text-white');
  });

  it('calls onSort with correct field when clicking Total value', async () => {
    const user = userEvent.setup();
    render(<HoldingHeader {...defaultProps} />);

    await user.click(screen.getByText('Total value'));
    expect(mockOnSort).toHaveBeenCalledWith('value');
  });

  it('calls onSort with correct field when clicking Amount', async () => {
    const user = userEvent.setup();
    render(<HoldingHeader {...defaultProps} />);

    await user.click(screen.getByText('Amount'));
    expect(mockOnSort).toHaveBeenCalledWith('amount');
  });

  it('rotates chevron icon when sort direction is ascending', () => {
    render(<HoldingHeader {...defaultProps} sortDirection="asc" />);

    const chevronIcons = screen.getAllByTestId('chevron-down-icon');

    // We are reserching for the chevron icon that has the text-white class
    const activeChevron = chevronIcons.find((icon) =>
      icon.getAttribute('class')?.includes('text-white'),
    );

    expect(activeChevron).toHaveClass('rotate-180');
  });
});
