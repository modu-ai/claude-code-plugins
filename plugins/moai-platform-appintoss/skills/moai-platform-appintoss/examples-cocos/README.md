# Cocos Creator Examples for Apps In Toss

토스 앱 내에서 실행되는 미니앱을 Cocos Creator로 개발할 때 참고할 수 있는 예제 프로젝트 모음입니다.

## 요구 사항

- [Cocos Creator 3.8.7](https://www.cocos.com/en/creator-download)
- Node.js 18 이상
- npm

## 프로젝트 목록

| 프로젝트 | 설명 |
|---------|------|
| [apps-in-toss-basic-example](#apps-in-toss-basic-example) | 앱 로그인, 사용자 키 획득, 화면 방향 설정, 이벤트 트래킹 등 기본 기능 예제 |
| [apps-in-toss-environment-example](#apps-in-toss-environment-example) | 디바이스 ID, 플랫폼 OS, 토스 앱 버전 등 환경 정보 조회 예제 |
| [apps-in-toss-inappads-example](#apps-in-toss-inappads-example) | Google AdMob 인앱 광고 연동 예제 |

---

## Getting Started

### 1. 의존성 설치

각 프로젝트를 실행하기 전에 반드시 해당 프로젝트 디렉토리에서 npm 패키지를 설치해야 합니다.

```bash
cd apps-in-toss-basic-example  # 원하는 프로젝트로 이동
npm install
```

### 2. Cocos Creator에서 프로젝트 열기

#### macOS

```bash
npm run cocos:dev
```

또는 직접 실행:

```bash
/Applications/Cocos/Creator/3.8.7/CocosCreator.app/Contents/MacOS/CocosCreator --project .
```

#### Windows

Windows에서는 `package.json`의 `cocos:dev` 스크립트를 직접 사용할 수 없습니다. 대신 다음과 같이 CocosCreator.exe 경로를 사용하세요:

```bash
"C:\CocosDashboard\resources\.editors\Creator\3.8.7\CocosCreator.exe" --project .
```

> **참고**: Windows에서 경로는 Cocos Creator 설치 위치에 따라 다를 수 있습니다. 일반적으로 CocosDashboard를 통해 설치하면 위와 같은 경로에 설치됩니다.

### 3. 프로젝트 빌드

```bash
npm run cocos:build  # Cocos Creator 빌드 (web-mobile)
npm run build        # granite 빌드
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 배포

```bash
npm run deploy
```

---

## 예제 프로젝트 상세

### apps-in-toss-basic-example

토스 미니앱의 기본적인 기능들을 사용하는 방법을 보여주는 예제입니다.

#### 포함된 기능

| 스크립트 | 기능 | 설명 |
|---------|------|------|
| `AppLoginController.ts` | `appLogin()` | 앱 로그인을 수행하고 인가 코드(authorizationCode)와 referrer를 획득합니다. |
| `GetUserKeyForGameController.ts` | `getUserKeyForGame()` | 게임에서 사용할 수 있는 사용자 고유 키를 획득합니다. |
| `SetDeviceOrientationController.ts` | `setDeviceOrientation()` | 디바이스 화면 방향을 portrait/landscape로 변경합니다. |
| `TrackEventController.ts` | `Analytics` | 화면 표시, 노출, 클릭 등의 이벤트를 트래킹합니다. |

---

### apps-in-toss-environment-example

토스 앱과 디바이스의 환경 정보를 조회하는 방법을 보여주는 예제입니다.

#### 포함된 기능

| 스크립트 | 기능 | 설명 |
|---------|------|------|
| `GetDeviceIdButtonController.ts` | `getDeviceId()` | 디바이스 고유 ID를 조회합니다. |
| `GetOperationalEnvController.ts` | `getOperationalEnvironment()` | 운영 환경(production, development 등)을 조회합니다. |
| `GetPlatformOsController.ts` | `getPlatformOS()` | 플랫폼 OS(iOS, Android 등)를 조회합니다. |
| `GetSchemeUriController.ts` | `getSchemeUri()` | 현재 미니앱의 Scheme URI를 조회합니다. |
| `GetTossAppVerController.ts` | `getTossAppVersion()` | 토스 앱 버전을 조회합니다. |

---

### apps-in-toss-inappads-example

Google AdMob을 사용한 인앱 광고 연동 방법을 보여주는 예제입니다.

#### 포함된 기능

| 스크립트 | 기능 | 설명 |
|---------|------|------|
| `TossAdMobManager.ts` | `GoogleAdMob` | 보상형 광고를 로드하고 표시합니다. 광고 시청 완료 시 보상(userEarnedReward) 이벤트를 처리합니다. |

#### 주요 API

- `GoogleAdMob.loadAppsInTossAdMob()`: 광고 로드
- `GoogleAdMob.showAppsInTossAdMob()`: 광고 표시
- `GoogleAdMob.loadAppsInTossAdMob.isSupported()`: 지원 여부 확인

---

## 커맨드 라인 빌드

Cocos Creator는 커맨드 라인에서 프로젝트를 빌드할 수 있습니다.

### macOS

```bash
/Applications/Cocos/Creator/3.8.7/CocosCreator.app/Contents/MacOS/CocosCreator --project . --build "platform=web-mobile;debug=true"
```

### Windows

```bash
"C:\CocosDashboard\resources\.editors\Creator\3.8.7\CocosCreator.exe" --project . --build "platform=web-mobile;debug=true"
```

### 주요 빌드 옵션

| 옵션 | 설명 |
|------|------|
| `platform` | 빌드할 플랫폼 (예: `web-mobile`, `web-desktop`) |
| `debug` | 디버그 모드 활성화 (`true` / `false`) |
| `outputName` | 빌드 출력 폴더 이름 |
| `buildPath` | 빌드 출력 경로 |

더 자세한 정보는 [Cocos Creator 커맨드 라인 빌드 문서](https://docs.cocos.com/creator/3.8/manual/en/editor/publish/publish-in-command-line.html)를 참고하세요.

---

## 의존성

모든 예제 프로젝트는 다음 패키지에 의존합니다:

- `@apps-in-toss/web-framework`: 토스 미니앱 SDK
