# Claude Plugins Marketplace

[한국어](README.ko.md)

A collection of high-quality Claude Code plugins by modu-ai.

---

## Table of Contents

- [Available Plugins](#available-plugins)
- [Requirements](#requirements)
- [Installation Guide](#installation-guide)
  - [Via Claude Code Marketplace](#via-claude-code-marketplace)
  - [Manual Installation](#manual-installation)
- [Update Guide](#update-guide)
- [Uninstallation Guide](#uninstallation-guide)
- [Usage Guide](#usage-guide)
- [Plugin Structure](#plugin-structure)
- [Module Reference](#module-reference)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [For Plugin Developers](#for-plugin-developers)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Resources](#resources)

---

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

## Requirements

Before installing plugins, please ensure you have:

| Requirement | Minimum Version | Check Command |
|-------------|-----------------|---------------|
| Claude Code | Latest | `claude --version` |
| Git | 2.0+ | `git --version` |
| Internet Connection | - | Required for Marketplace |

> **Note**: Claude Code must be properly installed and configured before installing plugins.

---

## Installation Guide

### Via Claude Code Marketplace

The easiest way to install plugins is through the Claude Code Marketplace.

#### Step 1: Open Claude Code

Launch Claude Code in your terminal:

```bash
claude
```

#### Step 2: Add the Plugin Repository

Run the following command in Claude Code:

```
/plugin marketplace add modu-ai/claude-plugins
```

#### Step 3: Verify Installation

Check that the plugin was installed successfully:

```
/plugin list
```

You should see `moai-security` in the list of installed plugins.

#### Step 4: Activate the Plugin

The plugin is automatically activated after installation. You can start using it immediately.

---

### Manual Installation

If you prefer manual installation or need offline access:

#### Step 1: Clone the Repository

```bash
git clone https://github.com/modu-ai/claude-plugins.git
cd claude-plugins
```

#### Step 2: Create Required Directories

```bash
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/commands
```

#### Step 3: Copy Plugin Files

**For moai-security plugin:**

```bash
# Copy skill files
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/

# Copy agent file
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/

# Copy command file
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

#### Step 4: Verify Installation

Check that files are in place:

```bash
ls ~/.claude/skills/moai-security/
ls ~/.claude/agents/
ls ~/.claude/commands/
```

---

## Update Guide

### Via Claude Code Marketplace

To update plugins to the latest version:

#### Step 1: Check for Updates

```
/plugin marketplace check-updates
```

#### Step 2: Update All Plugins

```
/plugin marketplace update
```

Or update a specific plugin:

```
/plugin marketplace update modu-ai/claude-plugins
```

#### Step 3: Verify Update

```
/plugin list --verbose
```

---

### Manual Update

If you installed manually:

#### Step 1: Navigate to Repository

```bash
cd /path/to/claude-plugins
```

#### Step 2: Pull Latest Changes

```bash
git pull origin main
```

#### Step 3: Re-copy Plugin Files

```bash
# Remove old files
rm -rf ~/.claude/skills/moai-security
rm -f ~/.claude/agents/expert-security.md
rm -f ~/.claude/commands/security-check.md

# Copy new files
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

---

## Uninstallation Guide

### Via Claude Code Marketplace

```
/plugin marketplace remove modu-ai/claude-plugins
```

To remove a specific plugin only:

```
/plugin remove moai-security
```

---

### Manual Uninstallation

Remove the plugin files:

```bash
# Remove skill files
rm -rf ~/.claude/skills/moai-security

# Remove agent file
rm -f ~/.claude/agents/expert-security.md

# Remove command file
rm -f ~/.claude/commands/security-check.md
```

Optionally, remove the cloned repository:

```bash
rm -rf /path/to/claude-plugins
```

---

## Usage Guide

### moai-security Plugin

#### Using the Skill

Load the skill in your prompts to get comprehensive Auth0 security guidance:

```
Skill("moai-security")
```

**Example Prompts:**

```
# Get attack protection recommendations
Skill("moai-security") - How should I configure brute force protection?

# Learn about MFA implementation
Skill("moai-security") - What are the best practices for WebAuthn setup?

# Token security guidance
Skill("moai-security") - How do I implement refresh token rotation?
```

---

#### Using the Agent

The expert-security agent performs detailed security assessments:

```
Use the expert-security subagent to review Auth0 configuration
```

**What the Agent Does:**
- Analyzes your Auth0 tenant configuration
- Identifies security vulnerabilities
- Provides prioritized recommendations
- Suggests implementation steps

---

#### Using the Command

Run security checks directly from Claude Code:

| Command | Description |
|---------|-------------|
| `/security-check full` | Complete security review of all areas |
| `/security-check attack-protection` | Review attack protection settings only |
| `/security-check mfa` | Review MFA configuration only |
| `/security-check tokens` | Review token security only |
| `/security-check compliance` | Check compliance status only |

**Example Output:**

```
/security-check full

Security Assessment Report
==========================
Attack Protection: 8/10
MFA Configuration: 7/10
Token Security: 9/10
Compliance Status: 6/10

Recommendations:
1. Enable Bot Detection on login
2. Configure Suspicious IP Throttling
3. Implement GDPR data handling procedures
...
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

| Module | Description |
|--------|-------------|
| attack-protection-overview.md | Overview of all attack protection features |
| bot-detection.md | Bot detection configuration |
| breached-password-detection.md | Compromised password checks |
| brute-force-protection.md | Login attempt limiting |
| suspicious-ip-throttling.md | IP-based rate limiting |
| akamai-integration.md | Akamai WAF integration |
| attack-protection-log-events.md | Logging and monitoring |
| state-parameters.md | CSRF protection |

### Multi-Factor Authentication (9 modules)

| Module | Description |
|--------|-------------|
| mfa-overview.md | MFA concepts and setup |
| mfa-factors.md | Available authentication factors |
| webauthn-fido.md | Passkey implementation |
| adaptive-mfa.md | Risk-based authentication |
| guardian-configuration.md | Auth0 Guardian setup |
| step-up-authentication.md | Progressive authentication |
| mfa-api-management.md | MFA via API |
| customize-mfa.md | Custom MFA flows |
| ropg-flow-mfa.md | Resource Owner Password Grant with MFA |

### Token Security (8 modules)

| Module | Description |
|--------|-------------|
| tokens-overview.md | Token types and lifecycle |
| jwt-fundamentals.md | JWT structure and validation |
| id-tokens.md | ID token usage |
| access-tokens.md | Access token patterns |
| delegation-tokens.md | Token delegation |
| refresh-tokens.md | Refresh token rotation |
| token-revocation.md | Token invalidation |
| token-best-practices.md | Security best practices |

### Sender Constraining (2 modules)

| Module | Description |
|--------|-------------|
| dpop-implementation.md | DPoP proof of possession |
| mtls-sender-constraining.md | Mutual TLS certificate binding |

### Compliance (7 modules)

| Module | Description |
|--------|-------------|
| compliance-overview.md | Compliance frameworks overview |
| fapi-implementation.md | Financial-grade API security |
| highly-regulated-identity.md | HRI features |
| gdpr-compliance.md | EU data protection |
| certifications.md | Auth0 certifications |
| tenant-access-control.md | Access management |
| customer-managed-keys.md | Encryption key management |

### Security Operations (5 modules)

| Module | Description |
|--------|-------------|
| security-center.md | Auth0 Security Center |
| application-credentials.md | Credential management |
| continuous-session-protection.md | Session security |
| security-guidance.md | General security advice |
| mdl-verification.md | Mobile driver license verification |

---

## Troubleshooting

### Plugin Not Found After Installation

**Problem:** Plugin doesn't appear in `/plugin list`

**Solutions:**
1. Restart Claude Code
2. Verify files exist:
   ```bash
   ls ~/.claude/skills/
   ls ~/.claude/agents/
   ls ~/.claude/commands/
   ```
3. Check file permissions:
   ```bash
   chmod -R 755 ~/.claude/
   ```

---

### Skill Not Loading

**Problem:** `Skill("moai-security")` returns error

**Solutions:**
1. Verify SKILL.md exists:
   ```bash
   cat ~/.claude/skills/moai-security/SKILL.md
   ```
2. Check for syntax errors in skill files
3. Re-install the plugin

---

### Command Not Recognized

**Problem:** `/security-check` not found

**Solutions:**
1. Verify command file exists:
   ```bash
   cat ~/.claude/commands/security-check.md
   ```
2. Ensure file has correct format
3. Restart Claude Code

---

### Update Fails

**Problem:** Marketplace update command fails

**Solutions:**
1. Check internet connection
2. Verify repository URL is accessible:
   ```bash
   curl -I https://github.com/modu-ai/claude-plugins
   ```
3. Try manual update instead

---

## FAQ

### General Questions

**Q: Is this plugin free to use?**
A: Yes, this plugin is open source under the MIT license.

**Q: Does this plugin work offline?**
A: Yes, once installed, the plugin works completely offline. Only installation and updates require internet.

**Q: Can I use multiple plugins together?**
A: Yes, plugins are designed to work independently and can be used together.

---

### Technical Questions

**Q: Where are plugins stored?**
A: Plugins are stored in `~/.claude/` with subdirectories for skills, agents, and commands.

**Q: How do I check the plugin version?**
A: Check the `plugin.json` file or run `/plugin list --verbose`.

**Q: Can I modify the plugin for my needs?**
A: Yes, the MIT license allows modifications. Consider contributing improvements back.

---

### Security Questions

**Q: Is my Auth0 configuration data sent anywhere?**
A: No, all analysis is done locally. No data is transmitted to external servers.

**Q: Are the security recommendations up to date?**
A: We regularly update modules to reflect current best practices. Check for updates frequently.

---

## For Plugin Developers

### Registering Your Plugin in Marketplace

To register your own plugin in Claude Code Marketplace:

#### Step 1: Create Plugin Structure

```
your-plugin/
├── .claude-plugin/
│   └── marketplace.json    # Required for Marketplace
├── plugins/
│   └── your-plugin-name/
│       ├── plugin.json     # Plugin manifest
│       ├── skills/
│       ├── agents/
│       └── commands/
└── README.md
```

#### Step 2: Create marketplace.json

```json
{
  "name": "your-plugin-collection",
  "description": "Description of your plugins",
  "version": "1.0.0",
  "author": {
    "name": "your-name"
  },
  "homepage": "https://github.com/your-name/your-repo",
  "repository": "https://github.com/your-name/your-repo",
  "license": "MIT",
  "plugins": [
    {
      "name": "your-plugin-name",
      "path": "plugins/your-plugin-name",
      "description": "What your plugin does"
    }
  ]
}
```

#### Step 3: Create plugin.json

```json
{
  "name": "your-plugin-name",
  "description": "Detailed description",
  "version": "1.0.0",
  "author": {
    "name": "your-name"
  },
  "homepage": "https://github.com/your-name/your-repo",
  "repository": "https://github.com/your-name/your-repo",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"]
}
```

#### Step 4: Submit for Review

1. Ensure your plugin follows best practices
2. Add comprehensive documentation
3. Include usage examples
4. Submit a PR or register via Marketplace

---

### Plugin Development Best Practices

1. **Clear Documentation**: Include detailed README and examples
2. **Modular Design**: Split large skills into modules
3. **Version Control**: Use semantic versioning
4. **Testing**: Test thoroughly before publishing
5. **Security**: Never include sensitive data in plugins

---

## Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with clear messages: `git commit -m "Add: description"`
6. **Push** to your fork: `git push origin feature/your-feature`
7. **Create** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add documentation for new features
- Update README if needed
- Include tests when applicable

---

## Changelog

### v1.0.0 (2024-12)

**Initial Release**
- Added moai-security plugin
- 39 security modules covering:
  - Attack Protection
  - Multi-Factor Authentication
  - Token Security
  - Sender Constraining
  - Compliance
  - Security Operations
- Expert security agent
- Security check command
- Comprehensive documentation

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Resources

- [Auth0 Security Documentation](https://auth0.com/docs/secure)
- [OWASP Top 10](https://owasp.org/Top10/)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Plugin Repository](https://github.com/modu-ai/claude-plugins)

---

Made with care by [modu-ai](https://github.com/modu-ai)
