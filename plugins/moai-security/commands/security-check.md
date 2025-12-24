---
name: security-check
description: Comprehensive Auth0 security configuration review
---

# /security-check Command

Performs a comprehensive review of Auth0 security configurations and provides recommendations based on OWASP Top 10 and Auth0 best practices.

## Usage

```
/security-check [options]
```

## Options

- **attack-protection**: Review attack protection settings only
- **mfa**: Review MFA configuration only
- **tokens**: Review token security only
- **compliance**: Review compliance status only
- **full**: Complete security review (default)

## Examples

```
/security-check full
/security-check mfa
/security-check compliance
```

## Process

1. Load moai-security skill for Auth0 security patterns
2. Execute security review using expert-security agent
3. Analyze current configuration against best practices
4. Generate security configuration report
5. Provide OWASP Top 10 compliance assessment
6. Deliver actionable recommendations

## Security Review Categories

### Attack Protection Review

Checks the following configurations:
- Bot Detection sensitivity and response type
- Breached Password Detection mode and actions
- Brute Force Protection thresholds
- Suspicious IP Throttling rates

### MFA Review

Evaluates:
- Enabled MFA factors
- Factor security levels
- Adaptive MFA configuration
- Step-up authentication settings

### Token Security Review

Assesses:
- JWT signing algorithm
- Token expiration policies
- Refresh token rotation
- Sender constraining (DPoP/mTLS)

### Compliance Review

Verifies:
- FAPI 1 Advanced requirements
- GDPR compliance features
- HIPAA BAA requirements
- ISO 27001 controls

## Output

The command generates a structured security report including:
- Current configuration summary
- Security posture assessment
- OWASP Top 10 compliance status
- Prioritized recommendations
- Remediation guidance

## Integration

This command uses:
- **Skill**: moai-security
- **Agent**: expert-security

## Notes

- Requires access to Auth0 Dashboard or Management API for configuration review
- Recommendations are based on Auth0 official documentation and security best practices
- Always validate recommendations against your specific compliance requirements
