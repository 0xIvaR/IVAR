# IVAR Testing

This directory contains all test files for the IVAR project.

## Test Structure

```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # Integration tests for component interactions  
├── e2e/           # End-to-end tests for full user flows
├── mocks/         # Mock data and utilities
└── setup/         # Test configuration and setup files
```

## Test Types

### Unit Tests
- Component rendering tests
- Service function tests
- Utility function tests
- Voice recognition tests

### Integration Tests
- Component interaction tests
- Service integration tests
- API integration tests

### End-to-End Tests
- Full user workflow tests
- Voice-to-response flow tests
- Settings and configuration tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- VoiceRecognition.test.js
```

## Test Framework

We use:
- **Jest** for unit and integration testing
- **React Testing Library** for component testing
- **Cypress** for end-to-end testing

## Writing Tests

1. Create test files with `.test.js` or `.spec.js` extension
2. Place tests in appropriate subdirectory
3. Follow naming convention: `ComponentName.test.js`
4. Include both positive and negative test cases
5. Mock external dependencies appropriately

## Coverage Goals

- **Unit Tests**: 90%+ coverage
- **Integration Tests**: Cover all major user flows
- **E2E Tests**: Cover critical business paths
