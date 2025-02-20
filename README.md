# To-Do Task-List

## Description

This project is a task list application built with Next.js and TypeScript. The application allows managing tasks with a calendar, assigning schedules, and setting responsible users.

## Technologies Used

- **Framework**: Next.js (v15.1.7)
- **Language**: TypeScript
- **UI Animations**: Framer Motion
- **Internationalization**: next-intl
- **Styling**: TailwindCSS
- **Date Handling**: date-fns
- **Icons**: react-icons
- **Loading Spinners**: react-spinners
- **Testing**: Jest, Testing Library
- **Linting**: ESLint

## Installation

1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd front_typescript
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

This project requires a `.env` file with the following variable:

```
NEXT_PUBLIC_BACK_API=<your_api_url>
```

Replace `<your_api_url>` with the actual backend API URL.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the code linter.
- `npm run test`: Runs tests with Jest.

## Project Structure

```
front_typescript/
│-- public/              # Static resources
│-- src/
│   ├── components/      # Reusable components
│   ├── pages/           # Main routes and views
│   ├── styles/          # Stylesheets
│   ├── utils/           # Utilities and helpers
│   ├── hooks/           # Custom Hooks
│   ├── context/         # Context API for global states
│   ├── services/        # API calls and business logic
│-- .eslintrc.js         # ESLint configuration
│-- tailwind.config.js   # Tailwind CSS configuration
│-- tsconfig.json        # TypeScript configuration
│-- package.json         # Dependencies and scripts
```

## Contribution

If you want to contribute:
1. Fork the repository.
2. Create a branch (`feature/new-feature`).
3. Make changes and submit a pull request.

## License
This project is licensed under Juan Laspiur.




