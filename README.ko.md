# Claude Plugins Marketplace

[English](README.md)

modu-ai에서 제공하는 고품질 Claude Code 플러그인 모음입니다.

## 사용 가능한 플러그인

### moai-security

공격 보호, MFA, 토큰 보안 및 컴플라이언스를 위한 Auth0 보안 전문 플러그인입니다.

**기능:**
- Attack Protection 구성 가이드 (Bot Detection, Breached Password, Brute Force, IP Throttling)
- Multi-Factor Authentication 설정 (WebAuthn, TOTP, Guardian, SMS/Voice, Duo)
- 토큰 보안 구현 (JWT, Access Token, Refresh Token, Rotation)
- Sender Constraining (DPoP, mTLS)
- 컴플라이언스 검증 (FAPI, GDPR, HIPAA, PCI DSS, ISO 27001)
- OWASP Top 10 Auth0 구현 패턴

---

## 설치 방법

### Claude Code Marketplace를 통한 설치

```
/plugin marketplace add modu-ai/claude-plugins
```

### 수동 설치

저장소를 클론하고 원하는 플러그인을 프로젝트에 복사합니다:

```bash
git clone https://github.com/modu-ai/claude-plugins.git
cd claude-plugins

# moai-security 플러그인 복사
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

---

## 사용 방법

### moai-security 플러그인

#### 스킬 사용하기

프롬프트에서 스킬을 로드합니다:
```
Skill("moai-security")
```

이 스킬은 포괄적인 Auth0 보안 패턴과 모범 사례를 제공합니다.

#### 에이전트 사용하기

보안 검토를 위해 에이전트를 호출합니다:
```
Use the expert-security subagent to review Auth0 configuration
```

에이전트는 상세한 보안 평가를 수행하고 권장 사항을 제공합니다.

#### 명령어 사용하기

보안 검사 실행:
```
/security-check full          # 전체 보안 검토
/security-check attack-protection  # Attack Protection만 검토
/security-check mfa           # MFA 구성만 검토
/security-check tokens        # 토큰 보안만 검토
/security-check compliance    # 컴플라이언스 상태만 검토
```

---

## 플러그인 구조

```
plugins/moai-security/
├── plugin.json                    # 플러그인 매니페스트
├── agents/
│   └── expert-security.md         # 보안 전문 에이전트
├── skills/
│   └── moai-security/
│       ├── SKILL.md               # 메인 스킬 정의
│       └── modules/               # 상세 보안 모듈
│           ├── attack-protection-overview.md
│           ├── mfa-overview.md
│           ├── tokens-overview.md
│           ├── dpop-implementation.md
│           ├── compliance-overview.md
│           └── ... (총 39개 모듈)
└── commands/
    └── security-check.md          # 보안 검사 명령어
```

---

## 모듈 참조

### Attack Protection (8개 모듈)
- attack-protection-overview.md
- bot-detection.md
- breached-password-detection.md
- brute-force-protection.md
- suspicious-ip-throttling.md
- akamai-integration.md
- attack-protection-log-events.md
- state-parameters.md

### Multi-Factor Authentication (9개 모듈)
- mfa-overview.md
- mfa-factors.md
- webauthn-fido.md
- adaptive-mfa.md
- guardian-configuration.md
- step-up-authentication.md
- mfa-api-management.md
- customize-mfa.md
- ropg-flow-mfa.md

### Token Security (8개 모듈)
- tokens-overview.md
- jwt-fundamentals.md
- id-tokens.md
- access-tokens.md
- delegation-tokens.md
- refresh-tokens.md
- token-revocation.md
- token-best-practices.md

### Sender Constraining (2개 모듈)
- dpop-implementation.md
- mtls-sender-constraining.md

### Compliance (7개 모듈)
- compliance-overview.md
- fapi-implementation.md
- highly-regulated-identity.md
- gdpr-compliance.md
- certifications.md
- tenant-access-control.md
- customer-managed-keys.md

### Security Operations (5개 모듈)
- security-center.md
- application-credentials.md
- continuous-session-protection.md
- security-guidance.md
- mdl-verification.md

---

## 기여하기

기여를 환영합니다! Pull Request를 자유롭게 제출해 주세요.

---

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

---

## 리소스

- [Auth0 보안 문서](https://auth0.com/docs/secure)
- [OWASP Top 10](https://owasp.org/Top10/)
- [Claude Code 문서](https://docs.anthropic.com/claude-code)

---

Made with care by [modu-ai](https://github.com/modu-ai)
