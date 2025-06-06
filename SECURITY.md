# 🔐 Security Policy

## 🛡️ Supported Versions

We actively support the following versions of IVAR with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🚨 Reporting a Vulnerability

We take the security of IVAR seriously. If you discover a security vulnerability, please follow these steps:

### 📧 Contact Information
- **Email**: sohamkundu4012@gmail.com
- **Subject**: `[SECURITY] IVAR Vulnerability Report`
- **GitHub**: Create a private security advisory on GitHub

### 📝 What to Include
Please include the following information in your report:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information

### ⏱️ Response Timeline
- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Every 7 days until resolved
- **Resolution**: Depends on severity and complexity

### 🎯 Severity Classification
We classify vulnerabilities using the following criteria:

- **🔴 Critical**: Immediate action required (RCE, data exposure)
- **🟠 High**: Significant security impact (auth bypass, XSS)
- **🟡 Medium**: Limited security impact (CSRF, information disclosure)
- **🟢 Low**: Minimal security impact (rate limiting, minor info leak)

### 🤝 Responsible Disclosure
We appreciate responsible disclosure of security vulnerabilities. We commit to:
- Working with you to understand and resolve the issue
- Keeping you informed throughout the process
- Crediting you for the discovery (if desired)
- Not pursuing legal action against researchers who follow this policy

### 🔒 Security Measures
IVAR implements several security measures:
- Local data storage (no server-side data collection)
- Secure API key handling in browser storage
- CORS protection on backend endpoints
- Input validation and sanitization
- Regular dependency updates

### 📚 Security Best Practices for Users
- Keep your API keys secure and don't share them
- Use HTTPS when deploying IVAR
- Regularly update to the latest version
- Review the code before deploying in production
- Use environment variables for sensitive configuration

## 📞 Contact
For any security-related questions or concerns, please contact:
- **Soham Kundu**: sohamkundu4012@gmail.com
- **GitHub**: [@0xIvaR](https://github.com/0xIvaR) 