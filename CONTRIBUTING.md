# Contributing to DO.ffy

Thank you for your interest in contributing to DO.ffy! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.x or higher)
- npm or yarn package manager
- Git

### Setting up the Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/doffy.git
   cd doffy
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** to `http://localhost:5173`

## 🛠️ Development Workflow

### Branch Naming Convention

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

### Making Changes

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add new node customization options"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

### JavaScript/React Guidelines

- Use functional components with hooks
- Follow React best practices for state management
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and single-purpose

### Code Style

- Use Prettier for code formatting
- Follow ESLint rules
- Use Tailwind CSS for styling
- Maintain consistent indentation (2 spaces)

### File Organization

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── constants/     # Application constants
└── assets/        # Static assets
```

## 🧪 Testing

- Write unit tests for new functionality
- Ensure all existing tests pass
- Test your changes in different browsers
- Verify responsive design works correctly

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive
- [ ] No console.log statements in production code

### Pull Request Template

When creating a pull request, please include:

1. **Description** of changes made
2. **Type of change** (bug fix, feature, documentation, etc.)
3. **Testing** performed
4. **Screenshots** (if applicable)
5. **Breaking changes** (if any)

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description** of the issue
- **Steps to reproduce** the problem
- **Expected behavior**
- **Actual behavior**
- **Browser/OS information**
- **Screenshots** (if helpful)

## 💡 Feature Requests

For feature requests, please provide:

- **Clear description** of the proposed feature
- **Use case** and benefits
- **Possible implementation** approach
- **Alternative solutions** considered

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update inline comments for complex logic
- Include examples in documentation

## 🎯 Areas for Contribution

We welcome contributions in these areas:

- **New node types** and customization options
- **Export formats** (SVG, PDF, etc.)
- **Keyboard shortcuts** and accessibility
- **Performance optimizations**
- **Mobile responsiveness**
- **Documentation improvements**
- **Bug fixes** and stability improvements

## 📞 Getting Help

- Check existing issues and discussions
- Create a new issue for questions
- Join our community discussions
- Review the codebase and documentation

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

Thank you for contributing to DO.ffy! 🎉