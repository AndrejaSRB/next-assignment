import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

type ResponseData = Record<string, unknown>;
interface HandlerConfig<T extends ResponseData = ResponseData> {
  url: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  res: (req: Request) => Promise<T> | T | never; // Added 'never' for error cases
}

export function createServer<T extends ResponseData = ResponseData>(
  handlerConfig: HandlerConfig<T>[],
) {
  const handlers = handlerConfig.map((config) => {
    const method = config.method || 'get';

    return http[method](config.url, async ({ request }) => {
      try {
        const responseData = await config.res(request);
        return HttpResponse.json(responseData);
      } catch (error) {
        // If the error is already an HttpResponse, throw it directly
        if (error instanceof HttpResponse) {
          throw error;
        }
        // Otherwise, throw a new 500 error
        throw new HttpResponse(null, { status: 500 });
      }
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    // Add new handlers after reset
    handlers.forEach((handler) => server.use(handler));
  });
  afterAll(() => server.close());

  // Return server instance for additional control if needed
  return server;
}
