import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

/**
 * Type for the response data that can be returned by the handler
 */
type ResponseData = Record<string, unknown>;

/**
 * Represents the configuration for a single API handler
 * @template T - The type of response data
 */
interface HandlerConfig<T extends ResponseData = ResponseData> {
  /** The URL path to mock (e.g., '/api/users') */
  url: string;
  /** HTTP method (defaults to 'get') */
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  /** Response resolver function that returns the mock response data */
  res: (req: Request) => Promise<T> | T;
}

/**
 * Creates a test server with mock API handlers for testing
 * @template T - The type of response data
 * @param handlerConfig - Array of handler configurations
 * @example
 * ```ts
 * interface UserResponse {
 *   users: Array<{ id: number; name: string }>
 * }
 *
 * createServer<UserResponse>([
 *   {
 *     url: '/api/users',
 *     method: 'get',
 *     res: () => ({
 *       users: [{ id: 1, name: 'John' }]
 *     })
 *   }
 * ])
 * ```
 */
export function createServer<T extends ResponseData = ResponseData>(
  handlerConfig: HandlerConfig<T>[],
) {
  // Transform handler configs into MSW handlers
  const handlers = handlerConfig.map((config) => {
    // Use the specified HTTP method or default to 'get'
    const method = config.method || 'get';

    // Create an MSW handler using the new v2 syntax
    return http[method](config.url, async ({ request }) => {
      const responseData = await config.res(request);
      return HttpResponse.json(responseData);
    });
  });

  // Create MSW server with the handlers
  const server = setupServer(...handlers);

  // Setup test lifecycle hooks
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
