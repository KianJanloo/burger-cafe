# Contributing to Burger Cafe

Thank you for your interest in contributing to Burger Cafe! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/burger-cafe.git
   cd burger-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000**

## 📝 How to Contribute

### 1. Reporting Bugs

When reporting bugs, please include:
- **Browser and version**
- **Operating system**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots if applicable**

### 2. Suggesting Features

We welcome feature requests! Please:
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

### 3. Code Contributions

#### **Pull Request Process**

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Add screenshots if UI changes

## 🎨 Coding Standards

### **TypeScript**
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible

### **React**
- Use functional components with hooks
- Follow React best practices
- Use proper prop types

### **Styling**
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing

### **Code Style**
- Use meaningful variable names
- Write clear comments
- Follow ESLint rules
- Use Prettier for formatting

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── data/               # Static data
├── hooks/              # Custom hooks
├── lib/                # Utilities
├── store/              # State management
├── types/              # TypeScript types
└── i18n.ts            # Internationalization
```

## 🌍 Internationalization

### **Adding New Translations**

1. **Add to English** (`messages/en.json`)
   ```json
   {
     "newFeature": {
       "title": "New Feature",
       "description": "Feature description"
     }
   }
   ```

2. **Add to Persian** (`messages/fa.json`)
   ```json
   {
     "newFeature": {
       "title": "ویژگی جدید",
       "description": "توضیحات ویژگی"
     }
   }
   ```

3. **Use in components**
   ```tsx
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('newFeature');
   return <h1>{t('title')}</h1>;
   ```

## 🧪 Testing

### **Manual Testing**
- Test on different browsers
- Test responsive design
- Test all user flows
- Test accessibility

### **Code Quality**
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Build check
npm run build
```

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on different browsers

## Screenshots
Add screenshots if UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Issue Templates

### **Bug Report**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 90]
- Version: [e.g. 1.0.0]
```

### **Feature Request**
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context about the feature request.
```

## 📞 Getting Help

- **GitHub Issues**: [Create an issue](https://github.com/your-username/burger-cafe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/burger-cafe/discussions)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Burger Cafe! 🍔
