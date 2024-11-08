import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders with placeholder text', () => {
    const mockSetSearchQuery = jest.fn();
    render(<SearchInput searchQuery="" setSearchQuery={mockSetSearchQuery} />);

    const inputElement = screen.getByPlaceholderText('Search assets...');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays the current search query value', () => {
    const mockSetSearchQuery = jest.fn();
    const testQuery = 'bitcoin';

    render(
      <SearchInput
        searchQuery={testQuery}
        setSearchQuery={mockSetSearchQuery}
      />,
    );

    const inputElement = screen.getByDisplayValue(testQuery);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls setSearchQuery when input value changes', async () => {
    const mockSetSearchQuery = jest.fn();
    render(<SearchInput searchQuery="" setSearchQuery={mockSetSearchQuery} />);

    const inputElement = screen.getByPlaceholderText('Search assets...');
    const testValue = 'eth';

    await user.type(inputElement, testValue); // Simulate typing

    // Called for each character typed
    expect(mockSetSearchQuery).toHaveBeenCalledTimes(3);
  });
});
