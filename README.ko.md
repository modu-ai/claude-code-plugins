# Claude Plugins Marketplace

[English](README.md)

modu-ai에서 제공하는 고품질 Claude Code 플러그인 모음입니다.

---

## 목차

- [사용 가능한 플러그인](#사용-가능한-플러그인)
- [요구 사항](#요구-사항)
- [설치 가이드](#설치-가이드)
  - [Claude Code Marketplace를 통한 설치](#claude-code-marketplace를-통한-설치)
  - [수동 설치](#수동-설치)
- [업데이트 가이드](#업데이트-가이드)
- [제거 가이드](#제거-가이드)
- [사용 가이드](#사용-가이드)
- [플러그인 구조](#플러그인-구조)
- [모듈 참조](#모듈-참조)
- [문제 해결](#문제-해결)
- [자주 묻는 질문](#자주-묻는-질문)
- [플러그인 개발자를 위한 안내](#플러그인-개발자를-위한-안내)
- [기여하기](#기여하기)
- [변경 이력](#변경-이력)
- [라이선스](#라이선스)
- [리소스](#리소스)

---

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

## 요구 사항

플러그인을 설치하기 전에 다음 사항을 확인해 주세요:

| 요구 사항 | 최소 버전 | 확인 명령어 |
|-----------|-----------|-------------|
| Claude Code | 최신 버전 | `claude --version` |
| Git | 2.0 이상 | `git --version` |
| 인터넷 연결 | - | Marketplace 사용 시 필요 |

> **참고**: 플러그인을 설치하기 전에 Claude Code가 올바르게 설치되고 구성되어 있어야 합니다.

---

## 설치 가이드

### Claude Code Marketplace를 통한 설치

플러그인을 설치하는 가장 쉬운 방법은 Claude Code Marketplace를 이용하는 것입니다.

#### 1단계: Claude Code 실행

터미널에서 Claude Code를 실행합니다:

```bash
claude
```

#### 2단계: 플러그인 저장소 추가

Claude Code에서 다음 명령어를 실행합니다:

```
/plugin marketplace add modu-ai/claude-plugins
```

#### 3단계: 설치 확인

플러그인이 성공적으로 설치되었는지 확인합니다:

```
/plugin list
```

설치된 플러그인 목록에 `moai-security`가 표시되어야 합니다.

#### 4단계: 플러그인 활성화

플러그인은 설치 후 자동으로 활성화됩니다. 바로 사용을 시작할 수 있습니다.

---

### 수동 설치

수동 설치를 선호하거나 오프라인 접근이 필요한 경우:

#### 1단계: 저장소 클론

```bash
git clone https://github.com/modu-ai/claude-plugins.git
cd claude-plugins
```

#### 2단계: 필수 디렉토리 생성

```bash
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/commands
```

#### 3단계: 플러그인 파일 복사

**moai-security 플러그인의 경우:**

```bash
# 스킬 파일 복사
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/

# 에이전트 파일 복사
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/

# 명령어 파일 복사
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

#### 4단계: 설치 확인

파일이 올바른 위치에 있는지 확인합니다:

```bash
ls ~/.claude/skills/moai-security/
ls ~/.claude/agents/
ls ~/.claude/commands/
```

---

## 업데이트 가이드

### Claude Code Marketplace를 통한 업데이트

플러그인을 최신 버전으로 업데이트하려면:

#### 1단계: 업데이트 확인

```
/plugin marketplace check-updates
```

#### 2단계: 모든 플러그인 업데이트

```
/plugin marketplace update
```

또는 특정 플러그인만 업데이트:

```
/plugin marketplace update modu-ai/claude-plugins
```

#### 3단계: 업데이트 확인

```
/plugin list --verbose
```

---

### 수동 업데이트

수동으로 설치한 경우:

#### 1단계: 저장소 디렉토리로 이동

```bash
cd /path/to/claude-plugins
```

#### 2단계: 최신 변경 사항 가져오기

```bash
git pull origin main
```

#### 3단계: 플러그인 파일 다시 복사

```bash
# 기존 파일 삭제
rm -rf ~/.claude/skills/moai-security
rm -f ~/.claude/agents/expert-security.md
rm -f ~/.claude/commands/security-check.md

# 새 파일 복사
cp -r plugins/moai-security/skills/moai-security ~/.claude/skills/
cp plugins/moai-security/agents/expert-security.md ~/.claude/agents/
cp plugins/moai-security/commands/security-check.md ~/.claude/commands/
```

---

## 제거 가이드

### Claude Code Marketplace를 통한 제거

```
/plugin marketplace remove modu-ai/claude-plugins
```

특정 플러그인만 제거하려면:

```
/plugin remove moai-security
```

---

### 수동 제거

플러그인 파일을 삭제합니다:

```bash
# 스킬 파일 삭제
rm -rf ~/.claude/skills/moai-security

# 에이전트 파일 삭제
rm -f ~/.claude/agents/expert-security.md

# 명령어 파일 삭제
rm -f ~/.claude/commands/security-check.md
```

선택적으로 클론한 저장소도 삭제할 수 있습니다:

```bash
rm -rf /path/to/claude-plugins
```

---

## 사용 가이드

### moai-security 플러그인

#### 스킬 사용하기

포괄적인 Auth0 보안 가이드를 받으려면 프롬프트에서 스킬을 로드합니다:

```
Skill("moai-security")
```

**예시 프롬프트:**

```
# 공격 보호 권장 사항 받기
Skill("moai-security") - Brute Force Protection은 어떻게 구성해야 하나요?

# MFA 구현에 대해 알아보기
Skill("moai-security") - WebAuthn 설정의 모범 사례는 무엇인가요?

# 토큰 보안 가이드
Skill("moai-security") - Refresh Token Rotation은 어떻게 구현하나요?
```

---

#### 에이전트 사용하기

expert-security 에이전트는 상세한 보안 평가를 수행합니다:

```
Use the expert-security subagent to review Auth0 configuration
```

**에이전트가 수행하는 작업:**
- Auth0 테넌트 구성 분석
- 보안 취약점 식별
- 우선순위가 지정된 권장 사항 제공
- 구현 단계 제안

---

#### 명령어 사용하기

Claude Code에서 직접 보안 검사를 실행합니다:

| 명령어 | 설명 |
|--------|------|
| `/security-check full` | 모든 영역에 대한 전체 보안 검토 |
| `/security-check attack-protection` | Attack Protection 설정만 검토 |
| `/security-check mfa` | MFA 구성만 검토 |
| `/security-check tokens` | 토큰 보안만 검토 |
| `/security-check compliance` | 컴플라이언스 상태만 확인 |

**예시 출력:**

```
/security-check full

보안 평가 보고서
==========================
Attack Protection: 8/10
MFA 구성: 7/10
토큰 보안: 9/10
컴플라이언스 상태: 6/10

권장 사항:
1. 로그인 시 Bot Detection 활성화
2. Suspicious IP Throttling 구성
3. GDPR 데이터 처리 절차 구현
...
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

| 모듈 | 설명 |
|------|------|
| attack-protection-overview.md | 모든 공격 보호 기능 개요 |
| bot-detection.md | 봇 탐지 구성 |
| breached-password-detection.md | 유출된 비밀번호 확인 |
| brute-force-protection.md | 로그인 시도 제한 |
| suspicious-ip-throttling.md | IP 기반 속도 제한 |
| akamai-integration.md | Akamai WAF 통합 |
| attack-protection-log-events.md | 로깅 및 모니터링 |
| state-parameters.md | CSRF 보호 |

### Multi-Factor Authentication (9개 모듈)

| 모듈 | 설명 |
|------|------|
| mfa-overview.md | MFA 개념 및 설정 |
| mfa-factors.md | 사용 가능한 인증 요소 |
| webauthn-fido.md | Passkey 구현 |
| adaptive-mfa.md | 위험 기반 인증 |
| guardian-configuration.md | Auth0 Guardian 설정 |
| step-up-authentication.md | 단계적 인증 |
| mfa-api-management.md | API를 통한 MFA |
| customize-mfa.md | 사용자 정의 MFA 플로우 |
| ropg-flow-mfa.md | MFA를 사용한 Resource Owner Password Grant |

### Token Security (8개 모듈)

| 모듈 | 설명 |
|------|------|
| tokens-overview.md | 토큰 유형 및 수명 주기 |
| jwt-fundamentals.md | JWT 구조 및 검증 |
| id-tokens.md | ID 토큰 사용법 |
| access-tokens.md | 액세스 토큰 패턴 |
| delegation-tokens.md | 토큰 위임 |
| refresh-tokens.md | 리프레시 토큰 순환 |
| token-revocation.md | 토큰 무효화 |
| token-best-practices.md | 보안 모범 사례 |

### Sender Constraining (2개 모듈)

| 모듈 | 설명 |
|------|------|
| dpop-implementation.md | DPoP 소유 증명 |
| mtls-sender-constraining.md | Mutual TLS 인증서 바인딩 |

### Compliance (7개 모듈)

| 모듈 | 설명 |
|------|------|
| compliance-overview.md | 컴플라이언스 프레임워크 개요 |
| fapi-implementation.md | 금융급 API 보안 |
| highly-regulated-identity.md | HRI 기능 |
| gdpr-compliance.md | EU 데이터 보호 |
| certifications.md | Auth0 인증 |
| tenant-access-control.md | 접근 관리 |
| customer-managed-keys.md | 암호화 키 관리 |

### Security Operations (5개 모듈)

| 모듈 | 설명 |
|------|------|
| security-center.md | Auth0 보안 센터 |
| application-credentials.md | 자격 증명 관리 |
| continuous-session-protection.md | 세션 보안 |
| security-guidance.md | 일반 보안 조언 |
| mdl-verification.md | 모바일 운전 면허증 확인 |

---

## 문제 해결

### 설치 후 플러그인을 찾을 수 없음

**문제:** `/plugin list`에 플러그인이 표시되지 않음

**해결 방법:**
1. Claude Code 재시작
2. 파일 존재 여부 확인:
   ```bash
   ls ~/.claude/skills/
   ls ~/.claude/agents/
   ls ~/.claude/commands/
   ```
3. 파일 권한 확인:
   ```bash
   chmod -R 755 ~/.claude/
   ```

---

### 스킬이 로드되지 않음

**문제:** `Skill("moai-security")` 실행 시 오류 발생

**해결 방법:**
1. SKILL.md 파일 존재 여부 확인:
   ```bash
   cat ~/.claude/skills/moai-security/SKILL.md
   ```
2. 스킬 파일의 구문 오류 확인
3. 플러그인 재설치

---

### 명령어가 인식되지 않음

**문제:** `/security-check`를 찾을 수 없음

**해결 방법:**
1. 명령어 파일 존재 여부 확인:
   ```bash
   cat ~/.claude/commands/security-check.md
   ```
2. 파일 형식이 올바른지 확인
3. Claude Code 재시작

---

### 업데이트 실패

**문제:** Marketplace 업데이트 명령어 실패

**해결 방법:**
1. 인터넷 연결 확인
2. 저장소 URL 접근 가능 여부 확인:
   ```bash
   curl -I https://github.com/modu-ai/claude-plugins
   ```
3. 수동 업데이트 시도

---

## 자주 묻는 질문

### 일반 질문

**Q: 이 플러그인은 무료인가요?**
A: 네, 이 플러그인은 MIT 라이선스 하에 오픈 소스로 제공됩니다.

**Q: 오프라인에서도 플러그인이 작동하나요?**
A: 네, 한 번 설치하면 플러그인은 완전히 오프라인으로 작동합니다. 설치와 업데이트만 인터넷이 필요합니다.

**Q: 여러 플러그인을 함께 사용할 수 있나요?**
A: 네, 플러그인은 독립적으로 작동하도록 설계되어 함께 사용할 수 있습니다.

---

### 기술 질문

**Q: 플러그인은 어디에 저장되나요?**
A: 플러그인은 `~/.claude/` 디렉토리에 skills, agents, commands 하위 디렉토리로 저장됩니다.

**Q: 플러그인 버전은 어떻게 확인하나요?**
A: `plugin.json` 파일을 확인하거나 `/plugin list --verbose`를 실행하세요.

**Q: 필요에 맞게 플러그인을 수정할 수 있나요?**
A: 네, MIT 라이선스는 수정을 허용합니다. 개선 사항을 다시 기여해 주시면 감사하겠습니다.

---

### 보안 질문

**Q: 제 Auth0 구성 데이터가 어딘가로 전송되나요?**
A: 아니요, 모든 분석은 로컬에서 수행됩니다. 외부 서버로 데이터가 전송되지 않습니다.

**Q: 보안 권장 사항은 최신 상태인가요?**
A: 현재 모범 사례를 반영하여 모듈을 정기적으로 업데이트합니다. 자주 업데이트를 확인해 주세요.

---

## 플러그인 개발자를 위한 안내

### Marketplace에 플러그인 등록하기

Claude Code Marketplace에 자신의 플러그인을 등록하려면:

#### 1단계: 플러그인 구조 생성

```
your-plugin/
├── .claude-plugin/
│   └── marketplace.json    # Marketplace에 필수
├── plugins/
│   └── your-plugin-name/
│       ├── plugin.json     # 플러그인 매니페스트
│       ├── skills/
│       ├── agents/
│       └── commands/
└── README.md
```

#### 2단계: marketplace.json 생성

```json
{
  "name": "your-plugin-collection",
  "description": "플러그인 설명",
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
      "description": "플러그인이 하는 일"
    }
  ]
}
```

#### 3단계: plugin.json 생성

```json
{
  "name": "your-plugin-name",
  "description": "상세 설명",
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

#### 4단계: 검토 제출

1. 플러그인이 모범 사례를 따르는지 확인
2. 포괄적인 문서 추가
3. 사용 예시 포함
4. PR 제출 또는 Marketplace를 통해 등록

---

### 플러그인 개발 모범 사례

1. **명확한 문서화**: 상세한 README와 예시 포함
2. **모듈식 설계**: 큰 스킬을 모듈로 분할
3. **버전 관리**: 시맨틱 버저닝 사용
4. **테스트**: 게시 전 철저히 테스트
5. **보안**: 플러그인에 민감한 데이터를 절대 포함하지 않음

---

## 기여하기

기여를 환영합니다! 기여 방법:

1. 저장소 **Fork**
2. 기능 브랜치 **생성**: `git checkout -b feature/your-feature`
3. 변경 사항 **작성**
4. 철저히 **테스트**
5. 명확한 메시지로 **커밋**: `git commit -m "Add: 설명"`
6. Fork로 **푸시**: `git push origin feature/your-feature`
7. **Pull Request** 생성

### 기여 가이드라인

- 기존 코드 스타일 준수
- 새 기능에 대한 문서 추가
- 필요시 README 업데이트
- 해당되는 경우 테스트 포함

---

## 변경 이력

### v1.0.0 (2024-12)

**최초 릴리스**
- moai-security 플러그인 추가
- 다음을 다루는 39개 보안 모듈:
  - Attack Protection
  - Multi-Factor Authentication
  - Token Security
  - Sender Constraining
  - Compliance
  - Security Operations
- 보안 전문 에이전트
- 보안 검사 명령어
- 종합 문서

---

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

---

## 리소스

- [Auth0 보안 문서](https://auth0.com/docs/secure)
- [OWASP Top 10](https://owasp.org/Top10/)
- [Claude Code 문서](https://docs.anthropic.com/claude-code)
- [플러그인 저장소](https://github.com/modu-ai/claude-plugins)

---

Made with care by [modu-ai](https://github.com/modu-ai)
