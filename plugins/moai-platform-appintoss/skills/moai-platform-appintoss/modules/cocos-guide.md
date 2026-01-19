# 앱인토스 Cocos Creator 개발 가이드

이 문서는 Cocos Creator 게임을 앱인토스 미니앱으로 개발하기 위한 가이드입니다.

---

## 개요

앱인토스는 Cocos Creator를 사용하여 Web-Mobile 형태의 미니앱 게임을 개발할 수 있습니다.

### 지원 환경

| 항목 | 요구사항 |
| ---- | -------- |
| Cocos Creator | 3.8.7 |
| Node.js | 18 이상 |
| 플랫폼 | Web-Mobile |

---

## 준비 사항

### 1. Cocos Creator 설치

[Cocos Creator 3.8.7](https://www.cocos.com/en/creator-download)을 설치합니다.

### 2. 프로젝트 구조

```
my-cocos-app/
├── assets/           # 게임 에셋 (스크립트, 이미지, 사운드)
├── build/            # 빌드 출력
├── packages/         # 확장 패키지
├── settings/         # 프로젝트 설정
├── granite.config.ts # Granite 설정
└── package.json      # npm 패키지 설정
```

---

## 개발 순서

```
1. Cocos Creator 프로젝트 생성
       ↓
2. Apps in Toss SDK 설치
       ↓
3. 게임 로직 개발
       ↓
4. SDK 기능 연동 (로그인, 광고, 트래킹)
       ↓
5. Web-Mobile 빌드
       ↓
6. Granite 빌드 및 테스트
       ↓
7. 배포
```

---

## SDK 설치

```bash
npm install @apps-in-toss/web-framework
```

---

## 핵심 기능 연동

### 토스 로그인

```typescript
// AppLoginController.ts
import { _decorator, Component } from 'cc';
import { appLogin } from '@apps-in-toss/web-framework';

const { ccclass, property } = _decorator;

@ccclass('AppLoginController')
export class AppLoginController extends Component {
    async onLoginButtonClicked() {
        const result = await appLogin();
        if (result.authorizationCode) {
            console.log('Authorization Code:', result.authorizationCode);
            console.log('Referrer:', result.referrer);
            // 서버로 인가 코드 전송
        }
    }
}
```

### 게임 사용자 키 획득

```typescript
// GetUserKeyForGameController.ts
import { _decorator, Component } from 'cc';
import { getUserKeyForGame } from '@apps-in-toss/web-framework';

const { ccclass } = _decorator;

@ccclass('GetUserKeyForGameController')
export class GetUserKeyForGameController extends Component {
    async getUserKey() {
        const userKey = await getUserKeyForGame();
        console.log('User Key:', userKey);
        // 게임 서버에서 사용자 식별에 사용
    }
}
```

### 화면 방향 설정

```typescript
// SetDeviceOrientationController.ts
import { _decorator, Component } from 'cc';
import { setDeviceOrientation } from '@apps-in-toss/web-framework';

const { ccclass } = _decorator;

@ccclass('SetDeviceOrientationController')
export class SetDeviceOrientationController extends Component {
    setLandscape() {
        setDeviceOrientation('landscape');
    }

    setPortrait() {
        setDeviceOrientation('portrait');
    }
}
```

### 이벤트 트래킹

```typescript
// TrackEventController.ts
import { _decorator, Component } from 'cc';
import { Analytics } from '@apps-in-toss/web-framework';

const { ccclass } = _decorator;

@ccclass('TrackEventController')
export class TrackEventController extends Component {
    trackScreenView(screenName: string) {
        Analytics.trackScreenView(screenName);
    }

    trackEvent(eventName: string, params?: Record<string, any>) {
        Analytics.trackEvent(eventName, params);
    }

    trackClick(elementName: string) {
        Analytics.trackClick(elementName);
    }
}
```

---

## 환경 정보 조회

### 디바이스 정보

```typescript
import {
    getDeviceId,
    getPlatformOS,
    getTossAppVersion,
    getOperationalEnvironment,
    getSchemeUri
} from '@apps-in-toss/web-framework';

// 디바이스 ID
const deviceId = await getDeviceId();

// 플랫폼 OS (iOS / Android)
const platformOS = await getPlatformOS();

// 토스 앱 버전
const tossVersion = await getTossAppVersion();

// 운영 환경 (production / development)
const env = await getOperationalEnvironment();

// Scheme URI
const schemeUri = await getSchemeUri();
```

---

## 인앱 광고 연동

### 보상형 광고

```typescript
// TossAdMobManager.ts
import { _decorator, Component } from 'cc';
import { GoogleAdMob } from '@apps-in-toss/web-framework';

const { ccclass } = _decorator;

@ccclass('TossAdMobManager')
export class TossAdMobManager extends Component {
    private isAdLoaded = false;

    async loadRewardedAd(adGroupId: string) {
        // 지원 여부 확인
        if (!GoogleAdMob.loadAppsInTossAdMob.isSupported()) {
            console.log('AdMob is not supported');
            return;
        }

        const result = await GoogleAdMob.loadAppsInTossAdMob({
            adGroupId: adGroupId
        });

        this.isAdLoaded = result.isLoaded;
    }

    async showRewardedAd() {
        if (!this.isAdLoaded) return;

        const result = await GoogleAdMob.showAppsInTossAdMob();

        if (result.userEarnedReward) {
            // 보상 지급
            console.log('Reward earned:', result.rewardAmount);
            this.giveReward(result.rewardAmount);
        }
    }

    private giveReward(amount: number) {
        // 게임 내 보상 로직
    }
}
```

---

## 빌드 및 배포

### 1. Cocos Creator 빌드

**macOS:**

```bash
npm run cocos:build
# 또는
/Applications/Cocos/Creator/3.8.7/CocosCreator.app/Contents/MacOS/CocosCreator --project . --build "platform=web-mobile;debug=true"
```

**Windows:**

```bash
"C:\CocosDashboard\resources\.editors\Creator\3.8.7\CocosCreator.exe" --project . --build "platform=web-mobile;debug=true"
```

### 2. Granite 빌드

```bash
npm run build
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 배포

```bash
npm run deploy
```

---

## 빌드 옵션

| 옵션 | 설명 |
| ---- | ---- |
| `platform` | 빌드 플랫폼 (`web-mobile`, `web-desktop`) |
| `debug` | 디버그 모드 (`true` / `false`) |
| `outputName` | 출력 폴더 이름 |
| `buildPath` | 출력 경로 |

---

## 예제 프로젝트

### Basic Example

기본 기능 예제 (`examples-cocos/apps-in-toss-basic-example/`):

- 토스 로그인 (`appLogin`)
- 게임 사용자 키 (`getUserKeyForGame`)
- 화면 방향 설정 (`setDeviceOrientation`)
- 이벤트 트래킹 (`Analytics`)

### Environment Example

환경 정보 조회 예제 (`examples-cocos/apps-in-toss-environment-example/`):

- 디바이스 ID (`getDeviceId`)
- 운영 환경 (`getOperationalEnvironment`)
- 플랫폼 OS (`getPlatformOS`)
- Scheme URI (`getSchemeUri`)
- 토스 앱 버전 (`getTossAppVersion`)

### InApp Ads Example

인앱 광고 예제 (`examples-cocos/apps-in-toss-inappads-example/`):

- 보상형 광고 로드 (`GoogleAdMob.loadAppsInTossAdMob`)
- 보상형 광고 표시 (`GoogleAdMob.showAppsInTossAdMob`)

---

## 리소스

- **개발자센터**: https://developers-apps-in-toss.toss.im
- **Cocos Creator 문서**: https://docs.cocos.com/creator/3.8/manual/en/
- **GitHub 예제**: https://github.com/toss/apps-in-toss-cocos-examples

---

## 주의사항

### 성능 최적화

- Draw Call 최소화 (50 이하 권장)
- 텍스처 아틀라스 사용
- 오디오 포맷 최적화 (MP3/AAC)
- 에셋 번들 활용

### WebGL 제한사항

- 멀티스레딩 미지원
- 일부 네이티브 API 미지원
- 파일 시스템 직접 접근 불가

### 권장사항

- Web-Mobile 플랫폼 타겟
- 모바일 최적화 에셋 사용
- 동적 배칭 활성화
- 메모리 관리 주의

---

Version: 1.0.0
Last Updated: 2026-01-19
Platform: Cocos Creator 3.8.7 for Apps in Toss
