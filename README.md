# Claude Plugins Marketplace

[한국어](README.ko.md)

A collection of high-quality Claude Code plugins by modu-ai.

## Available Plugins

### moai-security

Auth0 security specialist plugin for attack protection, MFA, token security, and compliance.

**Features:**
- Attack Protection configuration guidance (Bot Detection, Breached Password, Brute Force, IP Throttling)
- Multi-Factor Authentication setup (WebAuthn, TOTP, Guardian, SMS/Voice, Duo)
- Token security implementation (JWT, Access Tokens, Refresh Tokens, Rotation)
- Sender constraining (DPoP, mTLS)
- Compliance verification (FAPI, GDPR, HIPAA, PCI DSS, ISO 27001)
- OWASP Top 10 Auth0 implementation patterns

---

## Installation

### Via Claude Code Marketplace

```
/plugin marketplace add modu-ai/claude-plugins
```

### Manual Installation

Clone this repository and copy the desired plugin to your project:

```bash
git clone https://github.com/modu-ai/claude-plugins.git
cd claude-plugins

# Copy moai-security plugin
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

---

## Usage

### moai-security Plugin

#### Using the Skill

Load the skill in your prompts:
```
Skill("moai-security")
```

The skill provides comprehensive Auth0 security patterns and best practices.

#### Using the Agent

Invoke the agent for security reviews:
```
Use the expert-security subagent to review Auth0 configuration
```

The agent performs detailed security assessments and provides recommendations.

#### Using the Command

Run security checks:
```
/security-check full          # Complete security review
/security-check attack-protection  # Attack protection only
/security-check mfa           # MFA configuration only
/security-check tokens        # Token security only
/security-check compliance    # Compliance status only
```

---

## Plugin Structure

```
plugins/moai-security/
├── plugin.json                    # Plugin manifest
├── agents/
│   └── expert-security.md         # Security expert agent
├── skills/
│   └── moai-security/
│       ├── SKILL.md               # Main skill definition
│       └── modules/               # Detailed security modules
│           ├── attack-protection-overview.md
│           ├── mfa-overview.md
│           ├── tokens-overview.md
│           ├── dpop-implementation.md
│           ├── compliance-overview.md
│           └── ... (39 modules total)
└── commands/
    └── security-check.md          # Security check command
```

---

## Module Reference

### Attack Protection (8 modules)
- attack-protection-overview.md
- bot-detection.md
- breached-password-detection.md
- brute-force-protection.md
- suspicious-ip-throttling.md
- akamai-integration.md
- attack-protection-log-events.md
- state-parameters.md

### Multi-Factor Authentication (9 modules)
- mfa-overview.md
- mfa-factors.md
- webauthn-fido.md
- adaptive-mfa.md
- guardian-configuration.md
- step-up-authentication.md
- mfa-api-management.md
- customize-mfa.md
- ropg-flow-mfa.md

### Token Security (8 modules)
- tokens-overview.md
- jwt-fundamentals.md
- id-tokens.md
- access-tokens.md
- delegation-tokens.md
- refresh-tokens.md
- token-revocation.md
- token-best-practices.md

### Sender Constraining (2 modules)
- dpop-implementation.md
- mtls-sender-constraining.md

### Compliance (7 modules)
- compliance-overview.md
- fapi-implementation.md
- highly-regulated-identity.md
- gdpr-compliance.md
- certifications.md
- tenant-access-control.md
- customer-managed-keys.md

### Security Operations (5 modules)
- security-center.md
- application-credentials.md
- continuous-session-protection.md
- security-guidance.md
- mdl-verification.md

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Resources

- [Auth0 Security Documentation](https://auth0.com/docs/secure)
- [OWASP Top 10](https://owasp.org/Top10/)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)

---

Made with care by [modu-ai](https://github.com/modu-ai)
