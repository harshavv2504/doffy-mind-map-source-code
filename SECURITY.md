# Security Policy

## Supported Versions

We actively support the following versions of DO.ffy with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of DO.ffy seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: [INSERT SECURITY EMAIL]

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Our Response Process

1. **Acknowledgment**: We'll acknowledge receipt of your vulnerability report within 48 hours
2. **Investigation**: We'll investigate and validate the reported vulnerability
3. **Resolution**: We'll work on a fix and determine the release timeline
4. **Disclosure**: We'll coordinate with you on the disclosure timeline
5. **Credit**: We'll credit you in our security advisory (if desired)

## Security Considerations

### Client-Side Application

DO.ffy is a client-side React application that runs entirely in the browser. Key security considerations include:

### Data Storage
- All mind map data is stored locally in the browser
- No data is transmitted to external servers
- Users have full control over their data

### File Operations
- Save/load operations use browser's file system APIs
- JSON files are processed client-side only
- No server-side processing or storage

### Dependencies
- We regularly update dependencies to patch known vulnerabilities
- All dependencies are from trusted sources (npm registry)
- We use tools like `npm audit` to identify potential issues

### Content Security
- No user-generated content is executed as code
- All text input is properly sanitized
- XSS protection through React's built-in escaping

## Best Practices for Users

### Safe Usage
- Only load mind map files from trusted sources
- Be cautious when sharing exported mind maps containing sensitive information
- Keep your browser updated for the latest security patches

### Data Privacy
- Mind maps are stored locally in your browser
- Clear browser data will remove saved mind maps
- Consider backing up important mind maps to secure storage

## Vulnerability Disclosure Policy

We believe in responsible disclosure and will work with security researchers to:

- Acknowledge security reports within 48 hours
- Provide regular updates on our progress
- Credit researchers in our security advisories (if desired)
- Coordinate disclosure timelines that protect users while allowing researchers recognition

## Security Updates

Security updates will be:
- Released as soon as possible after validation
- Documented in our changelog
- Announced through our release notes
- Tagged with security labels in GitHub releases

## Contact

For security-related questions or concerns, please contact:
- Email: [INSERT SECURITY EMAIL]
- For general questions: [INSERT GENERAL EMAIL]

Thank you for helping keep DO.ffy and our users safe!