# Finance Flow v2 - Frontend

A modern, redesigned user interface for Personal Finance Tracker application. Built with **React.js** using **Tailwind CSS** and **Recharts** for financial data visualization - version 2.0 with enhanced features and improved architecture.

## 🎯 About The Project

Finance Flow v2 is a completely redesigned frontend for the personal finance management application. This version introduces significant architectural improvements, enhanced user experience, and expanded functionality for comprehensive financial tracking and analysis.

**Project Status:** 🚧 In Active Development

**Repository:** [github.com/Macijke/FinanceFlowv2_FRONTEND](https://github.com/Macijke/FinanceFlowv2_FRONTEND)

## 🆕 What's New in v2

Version 2.0 brings major improvements over the original Finance Flow:

- 🔄 **Redesigned Architecture** - Improved component structure and state management
- 🎨 **Enhanced UI/UX** - Modern, intuitive interface with better accessibility
- ⚡ **Performance Optimizations** - Faster load times and smoother interactions
- 📊 **Advanced Analytics** - More detailed financial insights and reporting
- 🔐 **Improved Security** - Enhanced authentication and data protection
- 📱 **Better Mobile Experience** - Optimized responsive design for all devices
- 🧩 **Modular Components** - Better code reusability and maintainability

## ✨ Features

- 🔐 **User Authentication** - Secure registration, login, and session management (JWT)
- 💰 **Transaction Management** - Add, edit, delete, and categorize income and expenses
- 📊 **Advanced Dashboard** - Real-time data visualization using Recharts (pie, line, bar charts)
- 💳 **Budget Planning** - Create monthly budgets with smart alerts and tracking
- 🎯 **Savings Goals** - Set and monitor progress toward financial objectives
- 📈 **Financial Analytics** - Detailed reports, spending trends, and insights
- 📱 **Fully Responsive** - Seamless experience across mobile, tablet, and desktop
- 🌓 **Dark Mode Support** - Toggle between light and dark themes
- 🔍 **Advanced Filtering** - Multi-criteria transaction search and filtering
- 👤 **Profile Management** - Update settings, change password, manage preferences
- 📤 **Export Data** - Download financial reports in multiple formats
- 🔔 **Smart Notifications** - Budget alerts and spending reminders

## 🛠 Tech Stack

Built with modern web technologies:

- **React.js** 18+ - UI Library
- **TypeScript** 98.4% - Type-safe development
- **Vite** - Next-generation build tool
- **React Router** v6 - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **React Hook Form** - Performant form management
- **date-fns** - Modern date utility library
- **React Icons** - Popular icon library
- **Axios** - HTTP client for API requests -> STILL IN DEVELOPMENT

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js** (version 18.x or higher recommended)
- **npm** (version 9.x or higher) or **yarn** (version 1.22.x or higher)
- **Git** (version 2.x or higher)

Optional but recommended:

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Macijke/FinanceFlowv2_FRONTEND.git
cd FinanceFlowv2_FRONTEND
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=30000

# Environment
VITE_ENV=development

# Optional: Analytics
VITE_ANALYTICS_ID=your-analytics-id

# Optional: Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_EXPORT=true
```

### Configuration Files

- **vite.config.ts** - Vite configuration
- **tailwind.config.js** - Tailwind CSS customization
- **tsconfig.json** - TypeScript compiler options

## 🏃 Running The Application

### Development mode

```bash
npm run dev
# or
yarn dev
```

Application will be available at: [**http://localhost:5173**](http://localhost:5173)

### Production build

```bash
npm run build
# or
yarn build
```

Built files will be in the `dist/` directory.

### Preview production build

```bash
npm run preview
# or
yarn preview
```

### Type checking

```bash
npm run type-check
# or
yarn type-check
```

## 📁 Project Structure

```
FinanceFlowv2_FRONTEND/
├── public/                    # Static assets
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── assets/               # Images, fonts, static files
│   ├── components/           # React components
│   │   ├── common/          # Reusable components
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   └── Card/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── transactions/    # Transaction management
│   │   ├── budgets/        # Budget components
│   │   ├── analytics/      # Analytics & charts
│   │   └── goals/          # Savings goals
│   ├── pages/              # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── Transactions.tsx
│   │   ├── Budgets.tsx
│   │   ├── Analytics.tsx
│   │   ├── SavingsGoals.tsx
│   │   ├── Settings.tsx
│   │   └── auth/
│   │       ├── Login.tsx
│   │       └── Register.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useTransactions.ts
│   │   └── useTheme.ts
│   ├── context/            # Context API providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/           # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── transactionService.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── transaction.types.ts
│   │   ├── user.types.ts
│   │   └── budget.types.ts
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── styles/             # Global styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Application entry point
│   └── routes.tsx          # Route definitions
├── .env.example            # Environment variables template
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore
├── package.json
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code analysis |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run unit tests (if configured) |

## 🔗 Backend API

This frontend requires the Finance Flow backend API:

- **Backend Repository:** [FINANCE-FLOW-BACKEND](https://github.com/Macijke/FINANCE-FLOW-BACKEND)
- **API Version:** v1
- **Documentation:** Swagger UI available at `http://localhost:8080/swagger-ui.html`

### API Endpoints Overview

- **Authentication:** `/api/v1/auth/*`
- **Transactions:** `/api/v1/transactions/*`
- **Budgets:** `/api/v1/budgets/*`
- **Goals:** `/api/v1/goals/*`
- **Analytics:** `/api/v1/analytics/*`

## 📝 Code Conventions

### General Guidelines

- Use **ESLint** and **Prettier** for consistent code formatting
- Follow **TypeScript** best practices and strict type checking
- Write **semantic HTML** with proper ARIA labels for accessibility

### Naming Conventions

- **Components:** PascalCase (e.g., `TransactionList.tsx`, `DashboardCard.tsx`)
- **Files/Functions:** camelCase (e.g., `formatCurrency.ts`, `useAuth.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- **CSS Classes:** Use Tailwind utility classes; custom classes in kebab-case

### Commit Messages

Follow **Conventional Commits** format:

```
feat: add transaction filtering by date range
fix: resolve budget calculation error
docs: update installation instructions
style: format code with prettier
refactor: reorganize component structure
test: add unit tests for auth service
chore: update dependencies
```

### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  // 4. Hooks
  const { user } = useAuth();
  
  // 5. State
  const [isActive, setIsActive] = useState(false);
  
  // 6. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 7. Handlers
  const handleClick = () => {
    onClick();
  };
  
  // 8. Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};
```

## 🔄 Migration from v1

If you're upgrading from Finance Flow v1:

1. **Backup your data** from v1 before migrating
2. Review **breaking changes** in the CHANGELOG.md
3. Update **environment variables** to match new configuration
4. Review **component API changes** if you have custom modifications
5. Test thoroughly in a development environment before production

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 📄 License

This project is available under the **MIT License**. See the LICENSE file for details.

## 👨‍💻 Author

**Macijke**

- GitHub: [@Macijke](https://github.com/Macijke)
- Email: [macijke@gmail.com](mailto:macijke@gmail.com)
- Repository: [FinanceFlowv2_FRONTEND](https://github.com/Macijke/FinanceFlowv2_FRONTEND)

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Recharts](https://recharts.org/) - Charting Library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on [GitHub Issues](https://github.com/Macijke/FinanceFlowv2_FRONTEND/issues).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

**Version 2.0** - Completely redesigned and rebuilt for better performance and user experience.
