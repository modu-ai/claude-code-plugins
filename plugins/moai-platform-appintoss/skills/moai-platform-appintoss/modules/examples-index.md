# 앱인토스 예제 코드 인덱스

이 문서는 앱인토스 공식 예제 코드의 인덱스입니다.
모든 예제는 `examples/` 디렉토리에서 전체 소스 코드를 확인할 수 있습니다.

---

## 프레임워크 예제

기본 프레임워크별 Weekly Todo 앱 구현 예제입니다.

| 예제 | 프레임워크 | 플랫폼 | 설명 |
|------|-----------|--------|------|
| weekly-todo-jquery | jQuery | WebView | jQuery 기반 할일 앱 |
| weekly-todo-react | React | WebView | React 기반 할일 앱 |
| weekly-todo-vue | Vue.js | WebView | Vue.js 기반 할일 앱 |

---

## 인증 & 로그인

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-app-login | WebView | 토스 로그인 연동 예제 |

**핵심 API:**
- `appsInTossLogin()` - 토스 로그인 호출
- OAuth2 Authorization Code 발급

---

## 결제 & 광고

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-in-app-purchase | React Native | 인앱 결제 (IAP) 예제 |
| with-interstitial-ad | RN + WebView | 전면 광고 예제 |
| with-rewarded-ad | RN + WebView | 보상형 광고 예제 |

**인앱 결제 핵심 API:**
- `getProductItemList()` - 상품 목록 조회
- `createOneTimePurchaseOrder()` - 단건 결제

**광고 핵심 API:**
- `loadAppsInTossAdMob()` - 광고 로드
- `showAppsInTossAdMob()` - 광고 표시

---

## 디바이스 기능

### 카메라 & 미디어

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-camera | RN + WebView | 카메라 촬영 예제 |
| with-album-photos | RN + WebView | 앨범 사진 접근 예제 |

**핵심 API:**
- `openCamera()` - 카메라 열기
- `getAlbumPhotos()` - 앨범 사진 가져오기

### 위치 정보

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-location-once | RN + WebView | 현재 위치 1회 조회 |
| with-location-callback | RN + WebView | 위치 변경 콜백 수신 |
| with-location-tracking | RN + WebView | 실시간 위치 추적 |

**핵심 API:**
- `getCurrentLocation()` - 현재 위치 조회
- `watchLocation()` - 위치 변경 감시
- `getPermission()` - 권한 상태 확인
- `openPermissionDialog()` - 권한 요청 다이얼로그

### 연락처

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-contacts | RN + WebView | 연락처 접근 예제 |
| with-contacts-viral | RN + WebView | 바이럴 마케팅용 연락처 |

**핵심 API:**
- `getContacts()` - 연락처 목록 조회

### 클립보드 & 공유

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-clipboard-text | RN + WebView | 클립보드 텍스트 복사 |
| with-share-text | RN + WebView | 텍스트 공유 |
| with-share-link | RN + WebView | 링크 공유 |

**핵심 API:**
- `copyToClipboard()` - 클립보드에 복사
- `share()` - 시스템 공유 시트 열기

### 기타 디바이스 기능

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-haptic-feedback | RN + WebView | 진동 피드백 예제 |
| with-storage | RN + WebView | 로컬 스토리지 예제 |
| with-network-status | RN + WebView | 네트워크 상태 확인 |
| with-platform-os | RN + WebView | OS별 분기 처리 |
| with-locale | RN + WebView | 로케일(언어) 설정 |
| with-operational-environment | RN + WebView | 운영 환경 확인 |

**핵심 API:**
- `triggerHapticFeedback()` - 햅틱 피드백
- `getNetworkStatus()` - 네트워크 상태
- `getPlatformOS()` - OS 타입 (iOS/Android)
- `getLocale()` - 현재 로케일
- `getOperationalEnvironment()` - 운영 환경 (dev/prod)

---

## 게임 개발

| 예제 | 플랫폼 | 설명 |
|------|--------|------|
| with-game | WebView | Three.js 기반 게임 예제 |
| random-balls | WebView | 간단한 게임 예제 |

**게임 개발 핵심 기능:**
- 사운드 (배경음, 효과음)
- 가로 모드 (`setDeviceOrientation`)
- 게임 프로필 & 리더보드
- 햅틱 피드백

---

## 예제 실행 방법

### WebView 예제

```bash
# 1. 패키지 설치
yarn install

# 2. 개발 서버 실행
yarn dev
```

### React Native (Granite) 예제

```bash
# 1. npm 토큰 설정 (.yarnrc.yml)
# npmAuthToken 항목에 토스 npm 계정 토큰 입력

# 2. 패키지 설치
yarn install

# 3. 개발 서버 실행
yarn start
```

---

## 테스트 환경

| 환경 | 설명 | 제한사항 |
|------|------|----------|
| 샌드박스 앱 | Android APK / iOS 앱 | 일부 기능 제한 (광고, 인앱결제 등) |
| 토스 앱 (QR) | 콘솔 QR 코드로 테스트 | 실제 결제 발생 가능 |

**샌드박스 제한 기능:**
- 애널리틱스
- 공유 리워드
- 인앱 광고
- 가로 모드 게임
- 네비게이션 바 공유

---

## 예제 디렉토리 구조

```
examples/
├── assets/                    # 공통 에셋 (이미지, QR 코드)
├── examples/                  # Granite 템플릿
├── random-balls/              # 간단한 게임 예제
├── weekly-todo-jquery/        # jQuery Todo 앱
├── weekly-todo-react/         # React Todo 앱
├── weekly-todo-vue/           # Vue Todo 앱
├── with-album-photos/         # 앨범 접근
├── with-app-login/            # 토스 로그인
├── with-camera/               # 카메라
├── with-clipboard-text/       # 클립보드
├── with-contacts/             # 연락처
├── with-contacts-viral/       # 바이럴 연락처
├── with-game/                 # 게임 예제
├── with-haptic-feedback/      # 햅틱
├── with-in-app-purchase/      # 인앱 결제
├── with-interstitial-ad/      # 전면 광고
├── with-locale/               # 로케일
├── with-location-callback/    # 위치 콜백
├── with-location-once/        # 위치 1회
├── with-location-tracking/    # 위치 추적
├── with-network-status/       # 네트워크 상태
├── with-operational-environment/ # 운영 환경
├── with-platform-os/          # OS 분기
├── with-rewarded-ad/          # 보상형 광고
├── with-share-link/           # 링크 공유
├── with-share-text/           # 텍스트 공유
└── with-storage/              # 로컬 스토리지
```

---

## 공식 리소스

- **GitHub**: https://github.com/toss/apps-in-toss-examples
- **개발자센터**: https://developers-apps-in-toss.toss.im
- **SDK 레퍼런스**: https://developers-apps-in-toss.toss.im/bedrock/reference

---

Version: 1.0.0
Last Updated: 2026-01-19
Source: https://github.com/toss/apps-in-toss-examples
