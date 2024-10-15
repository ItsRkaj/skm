# SKM - Next.js Web Application

## 📖 Overview

Welcome to the **SKM** web application, built using Next.js to provide a modern, dynamic experience for users. The app is designed with a combination of cutting-edge technologies including Supabase for backend services, Tailwind CSS for styling, and Shadcn UI components for highly accessible and customizable UI elements.

## 📖 Architecture Overview

<img width="896" alt="Skärmavbild 2024-10-15 kl  18 33 13" src="https://github.com/user-attachments/assets/1e2211c2-3857-4234-8e83-b7c20430dc1a">


## ✨ Key Features

- **Next.js (v14.2)**: Delivers fast, scalable, and SEO-friendly applications.
- **Supabase**: Handles authentication, data storage, and real-time capabilities.
- **Tailwind CSS**: Utility-first CSS framework that enables rapid design without leaving your HTML.
- **Shadcn UI Components**: Accessible, styled, and easily customizable components.
- **TypeScript**: Type-safe code to catch errors at build time.
- **Jest + Testing Library**: Robust testing setup for component and unit tests.
- **ESLint & Prettier**: Ensures consistent code formatting and style adherence.

## 🛠️ Prerequisites

Ensure the following are installed on your machine:

- **Node.js** `v16+`
- **yarn**

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://your-repository-url.git
   cd skm
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up enviroment variable**:

   Copy the .env.local.example file to .env.local and configure your environment variables.

   ```bash
   cp .env.local.example .env.local
   ```

4. **Start the decelopment server**:

   ```bash
   yarn run dev
   ```

   This will start the application locally at http://localhost:3000.

## 📜 Scripts

The project comes with several npm scripts to help with development, testing, and deployment.

| Script                  | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `yarn run dev`          | Runs the development server with hot reloading.                                       |
| `yarn run build`        | Compiles the project for production.                                                  |
| `yarn run start`        | Starts the compiled production build.                                                 |
| `yarn run lint`         | Runs ESLint to check for linting errors.                                              |
| `yarn run lint:fix`     | Automatically fixes linting issues.                                                   |
| `yarn run format`       | Formats code using Prettier.                                                          |
| `yarn run format:check` | Checks if the code adheres to the Prettier formatting rules.                          |
| `yarn run test`         | Runs all Jest tests.                                                                  |
| `yarn run test:watch`   | Watches files and reruns tests upon changes.                                          |
| `yarn run test:ts`      | Type-checks the entire project using TypeScript.                                      |
| `yarn run openapi`      | Generates TypeScript types from the OpenAPI spec file located at `src/docs/api.json`. |

## 📐 Code Formatting & Linting

We enforce strict code quality rules using ESLint and Prettier:

- **ESLint**: Lints JavaScript/TypeScript code to catch common issues.
- **Prettier**: Formats code to maintain consistency.

You can run both linters and auto-fix issues by running:

```bash
yarn lint
yarn lint:fix
yarn format
```

## 🧪 Testing

This project uses Jest and Testing Library for unit and component testing.
To run all tests:

```bash
yarn test
```

To run tests in watch mode:

```bash
yarn test:watch
```

## 🎨 Tailwind CSS

Tailwind CSS is configured and ready to use. You can start adding custom styles by modifying the `tailwind.config.js` file and using utility classes directly within your components.

## 📡 API Integration

The project uses openapi-typescript and openapi-fetch to handle API requests and TypeScript type generation from the OpenAPI spec. To regenerate types after updating the API spec:

```bash
yarn openapi
```

This will regenerate the `src/generated/api.d.ts` file based on the API spec located at `src/docs/api.json`.
