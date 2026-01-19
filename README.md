# 모두의AI 공식 Claude Code Plugin Marketplace

> Claude Code의 기능을 확장하는 공식 플러그인 저장소

[![Marketplace](https://img.shields.io/badge/Marketplace-Official-blue.svg)](https://github.com/modu-ai/cc-plugins)
[![License](https://img.shields.io/badge/license-Copyleft%20GPL--3.0-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugins-purple.svg)](https://claude.ai)

## 소개

**모두의AI Claude Code Plugin Marketplace**는 Claude Code 사용자를 위한 공식 플러그인 저장소입니다. 고품질의 검증된 플러그인을 통해 Claude Code의 기능을 확장하고, 개발 워크플로우를 혁신적으로 개선할 수 있습니다.

### 왜 모두의AI Marketplace인가?

- **검증된 품질**: 모든 플러그인은 엄격한 품질 검증을 거칩니다
- **한국어 최적화**: 한국어 개발자를 위한 최적화된 플러그인 제공
- **오픈소스 철학**: Copyleft 라이선스로 자유로운 사용과 기여 보장
- **지속적 업데이트**: 활발한 커뮤니티와 지속적인 개선

## 설치 방법

### 1단계: 마켓플레이스 추가

```bash
/plugin marketplace add modu-ai/cc-plugins
```

### 2단계: 플러그인 설치

```bash
/plugin install astory-blog-writers@moai-cc-plugins --scope project
```

> **권장**: `--scope project` 옵션을 사용하면 저장소의 모든 협업자가 플러그인을 사용할 수 있습니다.
>
> | Scope     | 설명                                   |
> | --------- | -------------------------------------- |
> | `user`    | 본인만 사용 (기본값)                   |
> | `project` | 저장소의 모든 협업자가 사용 **(권장)** |
> | `local`   | 본인만, 이 저장소에서만 사용           |

## 플러그인 목록

### astory-blog-writers (v2.0.0)

> Hybrid Author System v2.0 기반 DNA 블로그 작성 시스템

aStory Blog Writers는 혁신적인 Hybrid Author System v2.0을 기반으로 구축된 Claude Code 플러그인입니다. DNA 기반 특성 조합을 통해 독특하고 진정성 있는 블로그 콘텐츠를 생성합니다.

#### 핵심 기능

**Trait DNA Library (16개 특성)**

원자적 특성을 조합하여 256가지 이상의 고유한 작가 페르소나를 생성할 수 있습니다:

- **Voice 패턴**: Formal(한다체), Conversational(해요체), Narrative(서사체), Technical
- **Expertise 영역**: Architecture, Implementation, Industry, Education
- **Perspective 스타일**: Analytical, Experiential, Critical, Visionary
- **Tone 특성**: Authoritative, Empathetic, Provocative, Nurturing

**8개 프리셋 페르소나**

각 페르소나는 4가지 특성의 고유한 조합으로 구성됩니다:

| 페르소나                     | 전문 분야                  | 작성 스타일                     |
| ---------------------------- | -------------------------- | ------------------------------- |
| **Architect** (아키텍트)     | 시스템 설계, 아키텍처 패턴 | 학술적, 권위 있는 formal 한국어 |
| **Developer** (개발자)       | 실전 코딩, 프레임워크 활용 | 친근한 대화체, 경험 공유        |
| **Storyteller** (스토리텔러) | 프로젝트 회고, 기술 여정   | 과거형 서사, 장면 묘사          |
| **Mentor** (멘토)            | 개념 설명, 학습 가이드     | 명확한 구조, 긍정적 격려        |
| **Analyst** (분석가)         | 시장 트렌드, 기술 비교     | 데이터 중심, 정량적 분석        |
| **Reviewer** (리뷰어)        | 도구 리뷰, 제품 비교       | 균형 잡힌 장단점 제시           |
| **Curator** (큐레이터)       | 기술 뉴스, 릴리스 노트     | 간결한 핵심 요약                |
| **Columnist** (칼럼니스트)   | 오피니언, 논쟁적 토론      | 도발적 질문, 비판적 관점        |

**3가지 Writing Modes**

- **Solo Mode**: 단일 페르소나로 빠르고 일관된 작성 (5-10분)
- **Crew Mode**: 7개 역할(Creative Director, Research Analyst, Lead Writer, Technical Reviewer, Reader Advocate, Devil's Advocate, Editor-in-Chief)의 협업으로 최고 품질 콘텐츠 생산 (20-40분)
- **Adaptive Mode**: 섹션별 자동 페르소나 전환으로 복합 주제 최적화

**Anti-AI Pattern Validation**

- 3단계 AI 탐지: 금지 표현, 경고 표현, 구조적 패턴
- 자동 검증 훅으로 진정성 있는 목소리 유지
- AI 탐지 가능 표현 자동 수정 제안

**연구 시스템**

- 웹 검색 프로토콜
- 미디어 수집 (이미지, YouTube)
- 소스 검증 및 인용 관리

#### 빠른 시작

```bash
# 마켓플레이스 추가 (최초 1회)
/plugin marketplace add modu-ai/cc-plugins

# 플러그인 설치 (project scope 권장)
/plugin install astory-blog-writers@moai-cc-plugins --scope project

# 블로그 포스트 작성
/astory:post "확장 가능한 마이크로서비스 구축 방법"
```

#### 차별화 요소

일반적인 AI 작성 도구와 달리 aStory Blog Writers는:

- **DNA 기반 페르소나**: 고정된 프롬프트가 아닌 특성 조합으로 256+ 가능한 조합 생성
- **멀티모드 작성**: 상황에 맞는 최적의 작성 프로세스 선택
- **협업 시스템**: Crew Mode에서 7개 역할의 전문화된 검토 프로세스
- **한국어 최적화**: 한다체, 해요체, 서사체 등 한국어 작성 스타일 완벽 지원
- **AI 탐지 방지**: 진정성 있는 목소리 유지를 위한 자동 검증
- **독립 실행**: MoAI-ADK 의존성 없이 어디서나 사용 가능

---

### moai-platform-appintoss (v2.2.0)

> 앱인토스(Apps in Toss) 미니앱 개발 전문가

앱인토스는 파트너사가 개발한 서비스를 토스 앱 내부에서 App-in-App 형태로 제공하는 플랫폼입니다. 3,000만 토스 사용자에게 서비스를 노출할 수 있습니다.

#### 핵심 기능

**개발 플랫폼 지원**

| 플랫폼 | 프레임워크 | 용도 |
|--------|-----------|------|
| WebView | Vite + React + TypeScript | 일반 미니앱 |
| React Native | Granite Framework | 네이티브 기능 활용 |
| Unity | WebGL Build | 게임 개발 |
| Cocos | Cocos Creator 3.8.7 | 게임 개발 |

**TDS (Toss Design System)**

- **TDS Mobile**: WebView용 디자인 시스템 (`@toss/tds-mobile`)
- **TDS React Native**: Granite용 디자인 시스템 (`@toss/tds-react-native`)
- 색상 팔레트, 타이포그래피, 40+ 컴포넌트 제공

**통합 기능**

| 기능 | 설명 |
|------|------|
| 토스 로그인 | OAuth2 기반 사용자 인증 |
| 토스페이 | mTLS 인증 기반 결제 시스템 |
| 인앱 결제 | App Store / Google Play IAP |
| 푸시 알림 | 프로모션/기능성 메시지 |
| 광고 | 전면 광고, 보상형 광고 |
| 프로모션 | 토스 포인트 리워드 |

#### 빠른 시작

```bash
# 마켓플레이스 추가 (최초 1회)
/plugin marketplace add modu-ai/cc-plugins

# 플러그인 설치 (project scope 권장)
/plugin install moai-platform-appintoss@moai-cc-plugins --scope project
```

**WebView 프로젝트:**

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @apps-in-toss/web-framework @toss/tds-mobile
npx ait init
```

**React Native (Granite) 프로젝트:**

```bash
npm create granite-app
cd my-granite-app
npm install @apps-in-toss/framework @toss/tds-react-native
npx ait init
```

#### 모듈 구성

| 모듈 | 설명 |
|------|------|
| getting-started.md | 플랫폼 개요, 온보딩, 요구사항 |
| development.md | WebView/React Native 설정, 디버깅 |
| authentication.md | 토스 로그인, 게임 로그인, 토스 인증 |
| payment.md | 토스페이, 인앱 결제, mTLS |
| marketing.md | 푸시 알림, 광고, 프로모션 |
| launch.md | 검수 프로세스, 체크리스트 |
| monetization.md | 수익 구조, 정산, Biz Wallet |
| unity-guide.md | Unity WebGL 게임 개발 가이드 |
| cocos-guide.md | Cocos Creator 게임 개발 가이드 |
| tds-mobile.md | TDS Mobile 컴포넌트 가이드 |
| tds-react-native.md | TDS React Native 컴포넌트 가이드 |
| examples-index.md | 24+ 공식 예제 코드 인덱스 |

#### 리소스

- **공식 개발자센터**: [developers-apps-in-toss.toss.im](https://developers-apps-in-toss.toss.im)
- **TDS Mobile**: [tossmini-docs.toss.im/tds-mobile](https://tossmini-docs.toss.im/tds-mobile/)
- **TDS React Native**: [tossmini-docs.toss.im/tds-react-native](https://tossmini-docs.toss.im/tds-react-native/)

---

## 플러그인 카테고리

- **콘텐츠 생성**: 블로그, 문서, 기술 글쓰기를 위한 플러그인
- **개발 도구**: 소프트웨어 개발 워크플로우 지원 플러그인
- **플랫폼 통합**: 외부 플랫폼 및 서비스 연동 플러그인 (앱인토스, Firebase 등)
- **문서화**: 기술 문서 및 API 문서 작성 플러그인
- **생산성**: 개발 생산성 향상을 위한 유틸리티 플러그인

## 기여하기

모두의AI 플러그인 마켓플레이스에 기여를 환영합니다!

### 기여 방법

1. **저장소 포크**

   ```bash
   git clone https://github.com/modu-ai/cc-plugins.git
   ```

2. **새 플러그인 또는 개선사항 개발**

3. **풀 리퀘스트 제출**
   - 변경사항에 대한 명확한 설명
   - 테스트 결과 및 예제
   - 업데이트된 문서

자세한 기여 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

## 라이선스

**Copyleft License (GPL-3.0)**

Copyleft (c) 2026 GOOS

이 소프트웨어는 자유 소프트웨어입니다. GNU General Public License v3.0 조건에 따라 재배포하거나 수정할 수 있습니다.

**Copyleft 원칙**: 이 소프트웨어를 기반으로 파생된 모든 작업물은 동일한 라이선스 조건으로 공개되어야 합니다.

개별 플러그인의 라이선스는 각 플러그인 디렉토리를 참조하세요.

---

## 지원 및 문의

- **Discord**: [모두의AI 커뮤니티](https://discord.gg/KZSPSJjm5V)
- **Issues**: [GitHub Issues](https://github.com/modu-ai/cc-plugins/issues)
- **Discussions**: [GitHub Discussions](https://github.com/modu-ai/cc-plugins/discussions)
- **Email**: email@goos.kim
- **Developer Blog**: [https://goos.kim](https://goos.kim)

---

**모두의AI와 함께 Claude Code의 가능성을 확장하세요**

Made with ❤️ by **GOOS** | [모두의AI](https://github.com/modu-ai)
