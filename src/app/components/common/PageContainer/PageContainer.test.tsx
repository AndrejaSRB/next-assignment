import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';

describe('PageContainer', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';

    render(
      <PageContainer>
        <p>{testContent}</p>
      </PageContainer>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
