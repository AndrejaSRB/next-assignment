import { z } from 'zod';

const raw = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
};

const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string().optional(),
});

const env = schema.parse(raw);

export default env;
