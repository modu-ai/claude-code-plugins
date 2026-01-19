# moai-platform-appintoss

앱인토스(Apps in Toss) 미니앱 개발을 위한 Claude Code 플러그인입니다.

## Overview

앱인토스는 파트너사가 개발한 서비스를 토스 앱 내부에서 App-in-App 형태로 제공하는 플랫폼입니다. 3,000만 토스 사용자에게 서비스를 노출할 수 있습니다.

### Supported Features

| Feature | Description |
|---------|-------------|
| Toss Login | OAuth2 기반 사용자 인증 |
| TossPay | mTLS 인증 기반 결제 시스템 |
| In-App Purchase | App Store / Google Play IAP |
| Push Notifications | 프로모션/기능성 메시지 |
| Ads | 전면 광고, 보상형 광고 |
| Promotions | 토스 포인트 리워드 |

### Development Options

| Platform | Framework | Use Case |
|----------|-----------|----------|
| WebView | Vite + React + TypeScript | 일반 미니앱 |
| React Native | Granite Framework | 네이티브 기능 활용 |
| Unity | WebGL Build | 게임 개발 |
| Cocos | Cocos Creator 3.8.7 | 게임 개발 |

## Installation

```bash
claude plugin add github:modu-ai/cc-plugins --subdir plugins/moai-platform-appintoss
```

Or add to your project's `.claude/settings.json`:

```json
{
  "plugins": [
    {
      "source": "github",
      "repo": "modu-ai/cc-plugins",
      "subdir": "plugins/moai-platform-appintoss"
    }
  ]
}
```

## Usage

This plugin automatically activates when Claude detects keywords related to:

- `appintoss`, `앱인토스`
- `toss`, `토스`
- `miniapp`, `미니앱`
- `granite`, `webview`
- `토스페이`, `toss pay`
- `unity webgl`, `cocos creator`

### Quick Start

**WebView Project:**

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @apps-in-toss/web-framework @toss/tds-mobile
npx ait init
```

**React Native (Granite) Project:**

```bash
npm create granite-app
cd my-granite-app
npm install @apps-in-toss/framework @toss/tds-react-native
npx ait init
```

**Game Development:**

- Unity: See `modules/unity-guide.md`
- Cocos: See `modules/cocos-guide.md`

## Skill Contents

### Core Documentation

- **SKILL.md** - 빠른 참조 및 개요
- **reference.md** - 상세 API 문서, SDK 레퍼런스, 에러 코드
- **design-guide.md** - 브랜딩, 다크패턴 방지, UX 라이팅, TDS

### Modules

| Module | Description |
|--------|-------------|
| getting-started.md | 플랫폼 개요, 온보딩, 요구사항 |
| development.md | WebView/React Native 설정, 디버깅 |
| authentication.md | 토스 로그인, 게임 로그인, 토스 인증 |
| payment.md | 토스페이, 인앱 결제, mTLS |
| marketing.md | 푸시 알림, 광고, 프로모션 |
| launch.md | 검수 프로세스, 체크리스트 |
| monetization.md | 수익 구조, 정산, Biz Wallet |
| unity-guide.md | Unity WebGL 게임 개발 가이드 |
| cocos-guide.md | Cocos Creator 게임 개발 가이드 |
| tds-mobile.md | TDS Mobile (WebView용) 컴포넌트 가이드 |
| tds-react-native.md | TDS React Native (Granite용) 컴포넌트 가이드 |
| examples-index.md | 24+ 공식 예제 코드 인덱스 |

### Example Projects

플러그인에는 24개 이상의 공식 예제 프로젝트가 포함되어 있습니다:

**Framework Examples:**
- weekly-todo-jquery, weekly-todo-react, weekly-todo-vue

**Feature Examples:**
- with-app-login, with-in-app-purchase, with-rewarded-ad
- with-camera, with-location-*, with-contacts
- with-game, random-balls

**Cocos Examples:**
- apps-in-toss-basic-example
- apps-in-toss-environment-example
- apps-in-toss-inappads-example

## Platform Requirements

- **Android**: 7.0+
- **iOS**: 16+
- **Users**: 만 19세 이상

### Game Engine Requirements

| Engine | Version |
|--------|---------|
| Unity | 2021.3 LTS+ |
| Cocos Creator | 3.8.7 |

## Core Policies

### Required

- TDS (Toss Design System) 컴포넌트 사용 필수
- 라이트 모드 전용 (다크 모드 미지원)
- 토스 로그인만 사용 (서드파티 로그인 금지)
- 토스페이/인앱결제만 사용
- 번들 크기 100MB 이하

### Dark Pattern Prevention

- 진입 시 바텀시트 즉시 표시 금지
- 뒤로가기 가로채기 금지
- 종료 옵션 없는 UI 금지
- 예상치 못한 광고 노출 금지
- 모호한 CTA 버튼 금지

## Related Skills

- `moai-lang-typescript` - TypeScript 개발 패턴
- `moai-domain-frontend` - React 컴포넌트 개발
- `moai-domain-backend` - API 서버 개발
- `moai-domain-uiux` - UI/UX 디자인 시스템

## Resources

### Official Documentation
- [공식 개발자센터](https://developers-apps-in-toss.toss.im)
- [SDK 레퍼런스](https://developers-apps-in-toss.toss.im/bedrock/reference)
- [Unity 가이드](https://developers-apps-in-toss.toss.im/unity/intro/overview.html)
- [TDS Mobile](https://tossmini-docs.toss.im/tds-mobile/)
- [TDS React Native](https://tossmini-docs.toss.im/tds-react-native/)

### GitHub Examples
- [공식 예제](https://github.com/toss/apps-in-toss-examples)
- [Cocos 예제](https://github.com/toss/apps-in-toss-cocos-examples)

## License

MIT License - See [LICENSE](LICENSE) for details.

## Contributing

Issues and pull requests are welcome at [GitHub](https://github.com/modu-ai/cc-plugins).

---

Version: 2.2.0
Last Updated: 2026-01-19
