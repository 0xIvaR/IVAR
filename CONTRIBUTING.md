# Contributing to IVAR Voice Assistant 🤝

Thank you for your interest in contributing to IVAR! We welcome contributions from developers of all experience levels.

## 🚀 Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/IVAR.git
   cd IVAR
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style
- Use **ES6+** JavaScript features
- Follow **React best practices** (hooks, functional components)
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Add **JSDoc comments** for complex functions

### Naming Conventions
- **Components**: PascalCase (e.g., `VoiceRecognition.jsx`)
- **Functions**: camelCase (e.g., `handleVoiceInput`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **Files**: camelCase for utilities, PascalCase for components

### Project Structure
```
src/
├── components/         # React components
├── services/          # API and external service integrations
├── utils/             # Utility functions and helpers
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## 🛠️ Types of Contributions

### 🐛 Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Console error messages (if any)

### ✨ Feature Requests
For new features, please provide:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant mockups or examples

### 🔧 Code Contributions

#### Before You Start
- Check existing issues and PRs to avoid duplicates
- Discuss major changes in an issue first
- Ensure your feature aligns with project goals

#### Development Process
1. **Set up development environment**:
   ```bash
   npm run dev    # Start frontend
   npm run server # Start backend (in another terminal)
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Add comments for complex logic
   - Follow existing code style

3. **Test your changes**:
   - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test voice features with microphone
   - Test responsive design on different screen sizes

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new voice command feature"
   ```

#### Commit Message Format
Use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Voice recognition works in supported browsers
- [ ] Text-to-speech functions properly
- [ ] UI is responsive on mobile and desktop
- [ ] All voice commands respond correctly
- [ ] Error handling works as expected
- [ ] AI integration functions (if enabled)

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 📝 Documentation

When contributing, please:
- Update README.md if adding new features
- Add JSDoc comments for new functions
- Update API documentation for backend changes
- Include inline comments for complex logic

## 🚀 Pull Request Process

1. **Ensure your branch is up to date**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Create a Pull Request** with:
   - Clear title and description
   - Reference related issues
   - List of changes made
   - Screenshots/videos for UI changes
   - Testing notes

3. **PR Requirements**:
   - Code follows project style guidelines
   - All new features are tested
   - Documentation is updated
   - No console errors or warnings
   - Responsive design is maintained

## 🌟 Areas Where We Need Help

### High Priority
- **Mobile app development** (React Native/Capacitor)
- **Advanced AI integrations** (OpenAI, Anthropic, etc.)
- **Voice command expansion** (smart home, productivity)
- **Accessibility improvements** (screen readers, keyboard navigation)

### Medium Priority
- **Performance optimizations**
- **Offline functionality**
- **Multi-language support**
- **Custom wake word detection**

### Documentation & Community
- **Tutorial videos**
- **Blog posts and guides**
- **Translation of documentation**
- **Community Discord/forum moderation**

## 🎯 Getting Started Ideas

### Beginner-Friendly Issues
- Add new voice commands
- Improve UI animations
- Add more personality to AI responses
- Create new themes/color schemes

### Intermediate Issues
- Implement conversation memory
- Add weather API integration
- Create voice command shortcuts
- Improve error handling

### Advanced Issues
- Offline voice processing
- Custom AI model integration
- Smart home device integration
- Advanced speech synthesis

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community chat
- **Email**: sohamkundu4002@gmail.com

## 🏆 Recognition

Contributors will be:
- Listed in the README.md contributors section
- Mentioned in release notes for significant contributions
- Given contributor role in community spaces

## 📜 Code of Conduct

Be respectful and inclusive:
- Use welcoming and inclusive language
- Respect different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

---

Thank you for contributing to IVAR! Together, we're building the future of voice interfaces. 🚀 