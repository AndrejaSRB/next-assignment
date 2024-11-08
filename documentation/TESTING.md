## Testing

### Overview

This project uses:

- [Jest](https://jestjs.io/) as the testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing
- [MSW](https://mswjs.io/docs/) for mocking API requests

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- path/to/test-file.test.ts
```

### Test Coverage

```bash
# Generate test coverage report
npm run test:coverage
```

Target coverage thresholds:

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Test Structure

We are using the following structure for our tests, where component test is located in the same file as the component.

### Writing Tests

#### Component Tests

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

#### Utils Tests

Each utils has to be tested in a separate file and should be named like `*.test.ts`.

```typescript
import { render, screen } from '@testing-library/react';
import { clsxm } from './clsxm';

describe('Button', () => {
  it('should return combined class names', () => {
    const result = clsxm('btn', 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });
});
```

#### API Tests

You can test your API handlers by mocking the API requests with MSW and then testing if the response is correct.
For that you will need to import `server` from `src/lib/msw/server` and start it.

```typescript
import { server } from '../lib/msw/server';

createServer<PortfolioData>([
  {
    url: `API_URL`,
    method: 'get',
    res: () => MOCKED_RESPONSE,
  },
]);

describe('API Handler', () => {
  it('returns correct response', async () => {
    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
  });
});
```

### Testing Guidelines

1. **Naming Conventions**

   - Test files: `*.test.ts` or `*.test.tsx`
   - Test suites: Describe component or function name

2. **Component Testing**

   - Test user interactions
   - Verify rendered content
   - Check component states

3. **API Testing**

   - Test success response
   - Validate request/response formats
   - Test edge cases

### Continuous Integration

Tests are automatically run on:

- Pull request creation
- Push to main branch
- Push to development branch

Failed tests will block merging of pull requests.

### Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
