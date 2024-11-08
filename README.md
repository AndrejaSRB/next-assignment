# Portfolio DApp

This Portfolio DApp enables users to connect their cryptocurrency wallets and view all their tokens across multiple blockchain networks. It provides real-time token values, helping users manage and track their portfolio conveniently in one place.

| Environment | URL |
| ----------- | --- |
| Production  | URL |

Learn [how to contribute](./documentation/CONTRIBUTING.md)!

## Technologies

| Technology  | Version | Description                                                          |
| ----------- | ------- | -------------------------------------------------------------------- |
| Next.js     | 14.x    | React framework for server-side rendering and static site generation |
| TailwingCSS | 3.x     | Type-safe JavaScript, ensuring robust code quality                   |
| ZOD         | 3.x     | Type-safe data validation library                                    |
| JEST        | 29.x    | JavaScript testing framework for unit and integration tests          |

## Running the Application

### Environment Variables

Don't forget to check `.env` file for the correct environment variables. [Learn more about environment variables](./documentation/ENV_VARIABLES.md).

### Dependencies

After setting up your environment variables (`.env.local`), you have to install the dependencies and start the development server:

```shell
npm install
```

#### Development Server

Once the dependencies are installed, you can start the development server:

```shell
npm run dev
```

This will start a development server at http://localhost:3000.

#### Production Server

If you want to run the application in production mode, you can use the following command:

```shell
npm run build
npm run start
```

### Contributing

If you want to contribute to the project, be sure that you read the [CONTRIBUTING.md](./documentation/CONTRIBUTING.md) file, before you start coding.
