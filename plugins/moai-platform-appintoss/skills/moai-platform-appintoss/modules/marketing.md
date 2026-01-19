# 마케팅 가이드 (Marketing)

앱인토스 마케팅 기능 연동 가이드입니다.

---

## 푸시 알림

### 메시지 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| 프로모션 | 할인, 이벤트, 신상품 안내 | "오늘만 50% 할인!" |
| 기능성 | 주문 확인, 결제 승인, 배송 알림 | "주문이 완료되었습니다" |

### 템플릿 승인

푸시 메시지는 사전에 템플릿 승인이 필요합니다.

**승인 절차:**
1. 콘솔에서 템플릿 생성
2. 템플릿 내용 검토 요청
3. 승인 대기 (2-3 영업일)
4. 승인 완료 후 사용 가능

### API 호출

**Endpoint:** `POST /api-partner/v1/apps-in-toss/messenger/send-message`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request:**

```json
{
  "templateSetCode": "order_complete_01",
  "context": {
    "storeName": "토스 스토어",
    "orderDate": "2025년 01월 20일 15시 30분",
    "orderAmount": "10,000원"
  }
}
```

**참고:** `userName` 변수는 자동으로 사용자 이름으로 채워집니다.

**cURL 예제:**

```bash
curl --location 'https://apps-in-toss-api.toss.im/api-partner/v1/apps-in-toss/messenger/send-message' \
--header 'Content-Type: application/json' \
--header 'X-Toss-User-Key: {{userKey}}' \
--data '{
  "templateSetCode": "order_complete_01",
  "context": {
    "storeName": "토스 스토어",
    "orderDate": "2025년 01월 20일 15시 30분"
  }
}'
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "result": {
    "msgCount": 1,
    "sentPushCount": 1,
    "sentInboxCount": 0,
    "sentSmsCount": 0,
    "sentAlimtalkCount": 0,
    "sentFriendtalkCount": 0
  }
}
```

---

## 광고 연동

### 광고 유형

| 유형 | 설명 | 사용 시점 |
|------|------|----------|
| 전면 광고 (Interstitial) | 화면 전환 시 표시 | 스테이지 클리어, 화면 전환 |
| 보상형 광고 (Rewarded) | 시청 완료 시 보상 지급 | 게임 내 보상, 추가 기회 |

### 요구사항

| 항목 | 버전 |
|------|------|
| SDK | 1.0.3 이상 |

### 테스트 광고 ID

개발/테스트 시 테스트 ID를 사용합니다.

| 유형 | 테스트 ID |
|------|----------|
| 전면 광고 | `ait-ad-test-interstitial-id` |
| 보상형 광고 | `ait-ad-test-rewarded-id` |

**주의:** 프로덕션 출시 전 반드시 실제 광고 ID로 교체해야 합니다.

### 구현 순서

```
1. loadAppsInTossAdMob으로 광고 미리 로드
       ↓
2. 로드 완료 이벤트 수신
       ↓
3. showAppsInTossAdMob 호출하여 광고 표시
       ↓
4. 다음 광고 미리 로드 (연속 노출 대비)
```

### 코드 예시

```typescript
import { loadAppsInTossAdMob, showAppsInTossAdMob } from '@apps-in-toss/framework';

// 광고 로드
async function loadAd(adType: 'interstitial' | 'rewarded') {
  const adId = adType === 'interstitial'
    ? 'your-interstitial-id'
    : 'your-rewarded-id';

  try {
    await loadAppsInTossAdMob({
      adUnitId: adId,
      adType: adType,
    });
    console.log('광고 로드 완료');
  } catch (error) {
    console.error('광고 로드 실패:', error);
  }
}

// 광고 표시
async function showAd(adType: 'interstitial' | 'rewarded') {
  try {
    const result = await showAppsInTossAdMob({
      adType: adType,
    });

    if (adType === 'rewarded' && result.completed) {
      // 보상 지급
      await grantReward();
    }

    // 다음 광고 미리 로드
    loadAd(adType);
  } catch (error) {
    console.error('광고 표시 실패:', error);
  }
}
```

---

## 프로모션 (토스 포인트)

토스 포인트를 통해 사용자에게 리워드를 제공합니다.

### 사전 준비

**Biz Wallet 충전:**
- 프로모션 예산을 미리 충전해야 합니다
- 콘솔 > Biz Wallet에서 충전
- 부가세 없음 (포인트 지급 시)

### 게임용 프로모션

SDK를 직접 호출하여 프로모션 리워드를 지급합니다.

**요구사항:**
- 토스 앱 5.232.0 이상
- SDK 1.4.0 이상

**구현:**

```typescript
import { grantPromotionRewardForGame, getUserKeyForGame } from '@apps-in-toss/framework';

async function grantGameReward(promotionCode: string, amount: number) {
  try {
    // 사용자 해시 획득
    const { userKeyHash } = await getUserKeyForGame();

    // 프로모션 리워드 지급
    await grantPromotionRewardForGame({
      promotionCode: promotionCode,
      amount: amount,
      userKeyHash: userKeyHash,
    });

    console.log('리워드 지급 완료');
  } catch (error) {
    console.error('리워드 지급 실패:', error);
  }
}
```

**주의:** 중복 호출 시 동일 사용자에게 중복 지급될 수 있으므로 방어 로직이 필요합니다.

### 비게임용 프로모션 (API)

서버를 통해 프로모션 리워드를 지급합니다.

**Step 1: 프로모션 리워드 키 생성**

```bash
POST /api-partner/v1/apps-in-toss/promotion/execute-promotion/get-key
x-toss-user-key: {userKey}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "key": "3oBpxjUgl5r66edcVi7ynHGIjhzr9KOka6FfEKikev0="
  }
}
```

키 유효시간: 1시간

**Step 2: 프로모션 리워드 지급**

```bash
POST /api-partner/v1/apps-in-toss/promotion/execute-promotion
x-toss-user-key: {userKey}
```

**Request:**

```json
{
  "promotionCode": "01JPPJ6SB66BQXXDAKRQZ6SZD7",
  "key": "3oBpxjUgl5r66edcVi7ynHGIjhzr9KOka6FfEKikev0=",
  "amount": 100
}
```

**Step 3: 지급 상태 확인**

```bash
POST /api-partner/v1/apps-in-toss/promotion/execution-result
```

**상태 값:**

| 상태 | 설명 |
|------|------|
| SUCCESS | 지급 완료 |
| PENDING | 처리 중 |
| FAILED | 지급 실패 |

### 프로모션 에러 코드

| 코드 | 메시지 | 해결 방법 |
|------|--------|----------|
| 4100 | 프로모션 없음 | 콘솔에서 프로모션 존재 확인 |
| 4109 | 프로모션 미실행 | 콘솔에서 시작하거나 예산 확인 |
| 4112 | 프로모션 잔액 부족 | 콘솔에서 예산 충전 |
| 4113 | 이미 지급/회수됨 | 새 키 생성 필요 |
| 4114 | 단건 지급 한도 초과 | 금액 확인 |
| 4116 | 최대 지급액 초과 | 금액 조정 또는 예산 증액 |

---

## 게임센터

게임 미니앱을 위한 프로필 및 리더보드 기능입니다.

### 게임 프로필

사용자가 게임센터 프로필을 생성하면 리더보드 기능을 사용할 수 있습니다.

```typescript
import { createGameProfile, getGameProfile } from '@apps-in-toss/framework';

// 프로필 조회
async function loadProfile() {
  const profile = await getGameProfile();
  if (!profile) {
    // 프로필 생성 유도
    await promptProfileCreation();
  }
  return profile;
}
```

### 리더보드

친구 연결 기반 리더보드를 제공합니다.

**점수 제출:**

```typescript
import { submitScore } from '@apps-in-toss/framework';

async function submitGameScore(score: number) {
  try {
    await submitScore({
      score: score,
      leaderboardId: 'main-leaderboard',
    });
    console.log('점수 제출 완료');
  } catch (error) {
    console.error('점수 제출 실패:', error);
  }
}
```

**리더보드 조회:**

```typescript
import { getLeaderboard } from '@apps-in-toss/framework';

async function loadLeaderboard() {
  const leaderboard = await getLeaderboard({
    leaderboardId: 'main-leaderboard',
    limit: 100,
  });
  return leaderboard;
}
```

---

## 공유 리워드

친구 초대를 통한 바이럴 마케팅 기능입니다.

### 연락처 모듈

친구 초대를 위한 연락처 접근 기능을 제공합니다.

```typescript
import { shareWithContacts } from '@apps-in-toss/framework';

async function inviteFriends() {
  try {
    const result = await shareWithContacts({
      message: '함께 게임해요! 가입하면 포인트 지급!',
      promotionCode: 'INVITE2025',
    });

    console.log(`${result.sharedCount}명에게 공유됨`);
  } catch (error) {
    console.error('공유 실패:', error);
  }
}
```

### 바이럴 루프

1. 기존 사용자가 친구 초대
2. 친구가 앱 가입
3. 양쪽에 리워드 지급
4. 신규 사용자가 또 다른 친구 초대

---

## 애널리틱스

### 요구사항

| 항목 | 버전 |
|------|------|
| SDK | 0.0.26 이상 |

### 제공 데이터

- DAU (일일 활성 사용자)
- 인구통계 (성별, 연령대)
- 트래픽 소스
- 리텐션 (사용자 유지율)

### 이벤트 로깅

```typescript
import { Analytics } from '@apps-in-toss/framework';

// 클릭 이벤트
Analytics.click({
  element: 'buy_button',
  screen: 'product_detail',
});

// 노출 이벤트
Analytics.impression({
  element: 'banner_ad',
  screen: 'home',
});

// 커스텀 이벤트
Analytics.log({
  event: 'purchase_complete',
  params: {
    productId: 'item_001',
    amount: 10000,
  },
});
```

### 대시보드

콘솔 > 애널리틱스 탭에서 데이터를 확인할 수 있습니다.

- 실시간 사용자 현황
- 일별/주별/월별 트렌드
- 사용자 세그먼트 분석
- 퍼널 분석

---

## 다음 단계

- 출시 준비: [launch.md](./launch.md)
- 수익화: [monetization.md](./monetization.md)

---

Version: 2.0.0
Last Updated: 2026-01-18
