import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';

    render(
      <Card>
        <p>{testContent}</p>
      </Card>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
