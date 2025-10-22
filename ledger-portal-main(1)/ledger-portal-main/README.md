# GL Core Ledger Portal

A comprehensive ledger management portal built with Angular and Nx monorepo architecture.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
nx serve ledger-portal

# Or using npm scripts
npm run start:ledger-portal
```

The application will be available at `http://localhost:4200`

## 📁 Project Structure

This is an Nx monorepo with the following structure:

```
├── apps/
│   ├── ledger-portal/          # Main Angular application
│   └── ledger-portal-e2e/      # E2E tests
├── libs/
│   ├── back-office/          # Back-office specific libraries
│   │   ├── assets/           # Icons and images
│   │   ├── data/             # Data services and models
│   │   ├── feature/          # Feature modules
│   │   └── shared/           # Shared UI components
│   └── shared/               # Shared libraries across apps
│       ├── assets/           # Common assets
│       ├── data/             # Common data services
│       ├── ui/               # Reusable UI components
│       └── util/             # Utility functions
└── themes/                   # SCSS themes and styles
```

## 🏗️ Key Features

### Feature Modules

- **Authentication** - User login and session management
- **Certificate Management** - Certificate approval, cancellation, and requests
- **Supply Chain** - Supply chain management features
- **Discounting** - Financial discounting operations
- **Settlement** - Settlement processing
- **Communication** - Person and role management
- **Paper Symbol** - Paper symbol management
- **Product Types** - Product type configurations

### Shared Components

- Material Design components
- Custom form controls
- Data tables with pagination
- Dialog systems
- Theme switching
- Internationalization support

## 🔧 Development

### Running the Application

```bash
# Development server
nx serve ledger-portal

# Build for production
nx build ledger-portal --configuration=production

# Run unit tests
nx test ledger-portal

# Run e2e tests
nx e2e ledger-portal-e2e

# Run linting
nx lint ledger-portal
```

### Working with Libraries

```bash
# Generate a new feature library
nx g @nx/angular:lib feature/new-feature --directory=libs/back-office

# Generate a component in a library
nx g @nx/angular:component my-component --project=back-office-feature-new-feature

# See dependency graph
nx graph
```

## 🐳 Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
# Quick deployment
./docker-deploy.sh

# Manual build
docker build -t gl-core-ledger-portal:latest .

# Run with docker-compose
docker-compose up -d
```

The containerized app will be available at `http://localhost:8080`

For detailed deployment instructions, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

## 🎨 Theming

The application supports multiple themes:
- Default theme
- Spring theme  
- Autumn theme

Themes are configured in `themes/back-office/themes/`

## 🌐 Internationalization

The application is prepared for i18n with:
- Message constants in `libs/shared/util/locales/`
- Locale configuration for Persian/Farsi
- Date formatting with Jalali calendar support

## 📦 Technology Stack

- **Frontend Framework**: Angular 18
- **Build System**: Nx 20.5
- **UI Components**: Angular Material
- **Styling**: SCSS + Tailwind CSS
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Testing**: Jest + Cypress
- **Containerization**: Docker + nginx

## 🧪 Testing

```bash
# Unit tests
nx test ledger-portal

# Unit tests with coverage
nx test ledger-portal --coverage

# E2E tests
nx e2e ledger-portal-e2e

# Test affected by changes
nx affected:test
```

## 📊 Code Quality

```bash
# Lint the application
nx lint ledger-portal

# Format code
nx format:write

# Check circular dependencies
nx graph
```

## 🔨 Build & Deployment

### Production Build

```bash
# Build for production
nx build ledger-portal --configuration=production

# Build artifacts will be in dist/apps/ledger-portal/
```

### Environment Configuration

Configure environment-specific settings in:
- `apps/ledger-portal/src/environments/environment.ts` (development)
- `apps/ledger-portal/src/environments/environment.prod.ts` (production)

## 📝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 🆘 Troubleshooting

### Common Issues

**npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps
```

**Port 4200 already in use**
```bash
# Kill the process using the port
lsof -ti:4200 | xargs kill -9

# Or run on different port
nx serve ledger-portal --port=4201
```

**Build memory issues**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
nx build ledger-portal
```

## 📄 License

This project is proprietary and confidential.

## 🤝 Support

For support and questions, please contact the development team.# ledger-portal
