# 모두의AI 공식 Claude Code Plugin Marketplace

> Claude Code의 기능을 확장하는 공식 플러그인 저장소

[![Marketplace](https://img.shields.io/badge/Marketplace-Official-blue.svg)](https://github.com/modu-ai/claude-plugins)
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
/plugin marketplace add modu-ai/claude-code-plugins
```

### 2단계: 플러그인 설치

```bash
/plugin install astory-blog-writers@cc-plugins
```

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
/plugin marketplace add modu-ai/claude-code-plugins

# 플러그인 설치
/plugin install astory-blog-writers@cc-plugins

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

## 플러그인 카테고리

- **콘텐츠 생성**: 블로그, 문서, 기술 글쓰기를 위한 플러그인
- **개발 도구**: 소프트웨어 개발 워크플로우 지원 플러그인
- **문서화**: 기술 문서 및 API 문서 작성 플러그인
- **생산성**: 개발 생산성 향상을 위한 유틸리티 플러그인

## 기여하기

모두의AI 플러그인 마켓플레이스에 기여를 환영합니다!

### 기여 방법

1. **저장소 포크**

   ```bash
   git clone https://github.com/modu-ai/claude-code-plugins.git
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

- **Issues**: [GitHub Issues](https://github.com/modu-ai/claude-plugins/issues)
- **Discussions**: [GitHub Discussions](https://github.com/modu-ai/claude-plugins/discussions)
- **Email**: email@goos.kim
- **Developer Blog**: [https://goos.kim](https://goos.kim)

---

**모두의AI와 함께 Claude Code의 가능성을 확장하세요**

Made with ❤️ by **GOOS** | [모두의AI](https://github.com/modu-ai)
