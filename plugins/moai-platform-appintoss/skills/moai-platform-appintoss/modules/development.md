# 개발 가이드 (Development)

앱인토스 개발 환경 설정 및 구현 가이드입니다.

---

## WebView 개발

Vite + React + TypeScript 기반으로 간단한 앱을 개발합니다.

### 프로젝트 생성

```bash
npm create vite@latest {project명} -- --template react-ts
cd {project명}
npm install
```

### SDK 설치

```bash
npm install @apps-in-toss/web-framework
```

### 환경 설정

```bash
npx ait init
```

설정 과정에서 다음 정보를 입력합니다:
- Framework: web-framework 선택
- App Name: 콘솔에 등록된 앱 이름
- Dev Command: vite
- Build Command: vite build
- Port: 5173 (기본값)

### granite.config.ts 구성

```typescript
import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'my-app',
  brand: {
    displayName: '%%appName%%',
    primaryColor: '#3182F6',
    icon: null, // 로고 경로 또는 null
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
});
```

### TDS 설치 (필수)

```bash
npm install @toss/tds-mobile
```

TDS 사용 예시:

```tsx
import { Button, Text } from '@toss/tds-mobile';

function App() {
  return (
    <div>
      <Text typography="title1">앱인토스 앱</Text>
      <Button variant="primary" size="large">
        시작하기
      </Button>
    </div>
  );
}
```

---

## React Native (Granite) 개발

Granite 프레임워크를 사용하여 네이티브 앱을 개발합니다.

### 프로젝트 생성

```bash
npm create granite-app
cd my-granite-app
npm install
```

### SDK 설치

```bash
npm install @apps-in-toss/framework
```

### 환경 설정

```bash
npx ait init
```

### 파일 기반 라우팅

Granite은 Next.js 스타일의 파일 기반 라우팅을 지원합니다.

```
my-granite-app/pages
├─ index.tsx           → intoss://my-granite-app
├─ detail.tsx          → intoss://my-granite-app/detail
├─ [id].tsx            → intoss://my-granite-app/:id (동적 라우팅)
└─ item
   ├─ index.tsx        → intoss://my-granite-app/item
   └─ detail.tsx       → intoss://my-granite-app/item/detail
```

### URL Scheme

앱인토스 미니앱은 `intoss://` 스킴을 사용합니다:

```
intoss://{appName}/path?query=value
```

예시:
- `intoss://my-app` - 메인 페이지
- `intoss://my-app/detail` - 상세 페이지
- `intoss://my-app/item/123` - 동적 라우팅

### TDS 설치 (필수)

```bash
npm install @toss/tds-react-native
```

TDS 사용 예시:

```tsx
import { Button, Text, Screen } from '@toss/tds-react-native';

function HomeScreen() {
  return (
    <Screen>
      <Text typography="title1">앱인토스 앱</Text>
      <Button variant="primary" size="large">
        시작하기
      </Button>
    </Screen>
  );
}
```

---

## 디버깅

### WebView 디버깅

**Chrome DevTools:**

1. 샌드박스 앱에서 미니앱 실행
2. Chrome에서 `chrome://inspect` 접속
3. Remote Target에서 앱 선택
4. Inspect 클릭

**Safari Web Inspector (iOS):**

1. Safari > 설정 > 고급 > "웹 개발자용 메뉴 보기" 활성화
2. iOS 기기/시뮬레이터에서 미니앱 실행
3. Safari > 개발 > 기기 선택 > 페이지 선택

### React Native 디버깅

**React Native Debugger:**

1. React Native Debugger 설치
2. Metro bundler 실행: `npm start`
3. 앱에서 개발자 메뉴 열기 (흔들기 또는 d 키)
4. "Debug with React Native Debugger" 선택

**Flipper:**

1. Flipper 앱 설치
2. 앱 실행 시 자동 연결
3. Layout, Network, Logs 탭 활용

---

## 클라이언트 설정

### Android 설정

**필수 도구:**
- Android Studio
- ADB (Android Debug Bridge)
- Android SDK Tools

**ADB 포트 포워딩:**

```bash
# Metro bundler 포트 (React Native)
adb reverse tcp:8081 tcp:8081

# Vite 개발 서버 포트 (WebView)
adb reverse tcp:5173 tcp:5173

# 연결 확인
adb reverse --list
```

**USB 디버깅:**

1. 기기 설정 > 개발자 옵션 활성화
2. USB 디버깅 활성화
3. USB 연결 후 권한 승인

### iOS 설정

**필수 도구:**
- Xcode
- iOS Simulator

**시뮬레이터 실행:**

1. Xcode > Open Developer Tool > Simulator
2. 샌드박스 앱 설치 (콘솔에서 다운로드)
3. 스킴 입력: `intoss://{appName}`

**실제 기기 테스트:**

1. 로컬 네트워크 권한 허용
2. 서버 IP 주소 입력 (localhost 대신)
3. 방화벽 설정 확인

**쿠키 제한 (iOS 13.4+):**

iOS 13.4 이상에서는 서드파티 쿠키가 완전 차단됩니다.
토큰 기반 인증을 사용해야 합니다.

---

## 테스트 환경

### 샌드박스 앱

샌드박스 앱을 사용하여 개발 중인 앱을 테스트합니다.

**다운로드:**
- Android: 콘솔에서 APK 다운로드
- iOS: 콘솔에서 다운로드 또는 App Store

**테스트 가능 기능:**

| 기능 | 샌드박스 | 토스 앱 |
|------|---------|--------|
| 토스 로그인 | O | O |
| 게임 로그인 | O (mock) | O |
| 토스페이 | O | O |
| 인앱 결제 | O | O |
| 게임 프로필 | O | O |
| 리더보드 | O | O |
| 애널리틱스 | X | O |
| 공유 리워드 | X | O |
| 인앱 광고 | X | O |

### ADB 포트 포워딩

```bash
# 개발 서버 포트 설정
adb reverse tcp:8081 tcp:8081
adb reverse tcp:5173 tcp:5173

# 포트 목록 확인
adb reverse --list

# 모든 포워딩 제거
adb reverse --remove-all
```

### QR 코드 테스트

1. 번들(.ait) 파일 빌드: `npm run build`
2. 콘솔에 번들 업로드
3. QR 코드 생성됨
4. 토스 앱에서 QR 코드 스캔
5. 테스트 진행

**테스트 스킴:**

```
intoss-private://appsintoss?_deploymentId={deploymentId}
```

---

## Firebase 연동

### 허용 도메인 설정

Firebase Authentication을 사용하는 경우, 다음 도메인을 허용 목록에 추가해야 합니다:

**프로덕션:**
```
https://<appName>.apps.tossmini.com
```

**테스트:**
```
https://<appName>.private-apps.tossmini.com
```

### Firebase 설정 예시

```typescript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  // ... 기타 설정
};

const app = initializeApp(firebaseConfig);
```

---

## Sentry 모니터링

### 설정

Sentry를 사용하여 에러를 추적합니다.

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableNative: false, // 앱인토스에서는 false 필수
  tracesSampleRate: 1.0,
});
```

**주의:** `enableNative: false` 설정 필수. 네이티브 크래시 리포팅은 앱인토스 환경에서 지원되지 않습니다.

### 에러 캡처

```typescript
try {
  // 비즈니스 로직
} catch (error) {
  Sentry.captureException(error);
}
```

---

## 빌드 및 배포

### 번들 생성

```bash
npm run build
```

빌드 결과물로 `.ait` 파일이 생성됩니다.

### 번들 요구사항

- **최대 크기:** 100MB (비압축 기준)
- **형식:** .ait 파일
- **구성:** HTML, JS, CSS, 에셋 포함

### 콘솔 업로드

1. 콘솔 접속
2. 미니앱 선택
3. "배포" 탭 이동
4. 번들 파일 업로드
5. 버전 정보 입력
6. 검수 요청

---

## CORS 설정

서버 API 호출 시 CORS 설정이 필요합니다.

### Origin 허용 설정

**프로덕션:**
```
https://<appName>.apps.tossmini.com
```

**테스트:**
```
https://<appName>.private-apps.tossmini.com
```

### 서버 설정 예시 (Express)

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://my-app.apps.tossmini.com',
    'https://my-app.private-apps.tossmini.com'
  ],
  credentials: true
}));
```

---

## 다음 단계

- 토스 로그인 연동: [authentication.md](./authentication.md)
- 결제 연동: [payment.md](./payment.md)
- 마케팅 기능: [marketing.md](./marketing.md)

---

Version: 2.0.0
Last Updated: 2026-01-18
