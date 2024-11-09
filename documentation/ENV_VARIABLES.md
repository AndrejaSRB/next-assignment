### Environment Variables

Open the `.env` file in the root directory and take all the variables from there.

Create a `.env.local` file in the root directory and add all the variables from `.env` file with the correct values:

```plaintext
NEXT_PUBLIC_API_URL="YOUR_API_URL"
```

#### Required Variables:

All variables listed in `.env` file are required.

#### Add new variables

If you need to add a new variable, add it to the `.env` file (without values!, just with the placeholder) and then to the `.env.local` file.

Don't forget to update the `zod` schema in `src/lib/env.ts` file to include the new variable.

#### Remove variables

If you need to remove a variable, remove it from the `.env` file and then from the `.env.local` file.

Don't forget to remove it from the `zod` schema in `src/lib/env.ts` file.

#### How to get values of the variables?

You have to import `env` from `src/lib/env.ts` file and use it in your code.

### Handling variables on Vercel

You have to add/remove them to the Vercel project settings.
