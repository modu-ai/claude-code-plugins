# 결제 가이드 (Payment)

앱인토스 결제 시스템 연동 가이드입니다.

---

## 토스페이

토스페이를 통해 안전한 결제를 구현합니다.

### Base URL

```text
https://pay-apps-in-toss-api.toss.im
```

### mTLS 인증서 필수

토스페이 API 호출에는 mTLS 인증서가 필수입니다.

**인증서 정보:**
- 유효기간: 390일
- 발급: 콘솔에서 앱 선택 > mTLS 인증서 탭
- 갱신 알림: 만료 1개월, 1주, 1일 전

**주의:** 인증서가 외부에 노출되면 즉시 폐기 후 재발급해야 합니다.

### 결제 플로우

```
1. 결제 생성 (POST /make-payment)
       ↓
2. SDK로 사용자 결제 인증 (checkoutPayment)
       ↓
3. 결제 실행 (POST /execute-payment)
       ↓
4. 필요시 환불 (POST /refund-payment)
```

### Step 1: 결제 생성

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/make-payment`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request:**

```json
{
  "orderNo": "ORDER-20250120-001",
  "productDesc": "프리미엄 아이템",
  "amount": 10000,
  "amountTaxFree": 0,
  "amountTaxable": 9091,
  "amountVat": 909,
  "enablePayMethods": "TOSS_MONEY,CARD",
  "cashReceipt": false,
  "installment": "USE",
  "isTestPayment": false
}
```

**Request Parameters:**

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| orderNo | String | Y | 고유 주문번호 (최대 50자) |
| productDesc | String | Y | 상품 설명 (최대 255자) |
| amount | Integer | Y | 총 결제 금액 |
| amountTaxFree | Integer | Y | 비과세 금액 (과세 상품은 0) |
| amountTaxable | Integer | N | 과세 금액 (생략 시 자동 계산) |
| amountVat | Integer | N | 부가세 (생략 시 자동 계산) |
| enablePayMethods | String | N | 결제 수단 필터 (TOSS_MONEY, CARD) |
| cashReceipt | Boolean | N | 현금영수증 발행 여부 |
| installment | String | N | 할부 설정 (USE, NOT_USE) |
| isTestPayment | Boolean | Y | 테스트 결제 여부 |

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "payToken": "O1NZck9XME8ureeVJVJP67"
  }
}
```

### Step 2: SDK 결제 인증

```typescript
import { checkoutPayment } from '@apps-in-toss/framework';

async function processPayment(payToken: string) {
  try {
    const result = await checkoutPayment({
      payToken: payToken,
    });

    if (result.status === 'APPROVED') {
      // 서버에서 결제 실행 요청
      await executePayment(payToken);
    }
  } catch (error) {
    console.error('결제 인증 실패:', error);
  }
}
```

### Step 3: 결제 실행

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/execute-payment`

**Request:**

```json
{
  "payToken": "O1NZck9XME8ureeVJVJP67",
  "orderNo": "ORDER-20250120-001",
  "isTestPayment": false
}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "code": 0,
    "mode": "LIVE",
    "orderNo": "ORDER-20250120-001",
    "amount": 10000,
    "approvalTime": "2025-01-20 15:30:00",
    "stateMsg": "결제 완료",
    "paidAmount": 10000,
    "payMethod": "CARD",
    "payToken": "O1NZck9XME8ureeVJVJP67",
    "transactionId": "45a77cf4-5577-4d5c-8827-4d4dd328bf12",
    "cardCompanyCode": "4",
    "cardCompanyName": "국민",
    "cardAuthorizationNo": "12345678"
  }
}
```

### Step 4: 결제 환불

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/refund-payment`

**Request:**

```json
{
  "payToken": "O1NZck9XME8ureeVJVJP67",
  "reason": "고객 변심으로 인한 환불",
  "isTestPayment": false
}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "refundNo": "REFUND-001",
    "approvalTime": "2025-01-20 16:00:00",
    "refundableAmount": 0,
    "refundedAmount": 10000,
    "transactionId": "45a77cf4-5577-4d5c-8827-4d4dd328bf12"
  }
}
```

### 결제 상태 조회

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/get-payment-status`

**결제 상태 코드:**

| 코드 | 설명 |
|------|------|
| PAY_STANDBY | 결제 대기 중 |
| PAY_APPROVED | 사용자 인증 완료 |
| PAY_COMPLETE | 결제 완료 |
| REFUND_SUCCESS | 환불 완료 |
| SETTLEMENT_COMPLETE | 정산 완료 |

---

## 인앱 결제 (IAP)

앱 스토어를 통한 인앱 결제를 구현합니다.

### 요구사항

| 항목 | 버전 |
|------|------|
| SDK | 1.1.3 이상 |
| Android | 5.231.0 이상 |
| iOS | 5.231.0 이상 |

### 상품 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| 소모성 | 사용 후 재구매 필요 | 게임 내 화폐, 아이템 |
| 비소모성 | 한 번 구매로 영구 사용 | 광고 제거, 프리미엄 기능 |

### 가격 제한

| 항목 | 금액 |
|------|------|
| 최소 | 400원 |
| 최대 | 1,400,000원 |

### 구현

**상품 목록 조회:**

```typescript
import { getProductItemList } from '@apps-in-toss/framework';

async function loadProducts() {
  const products = await getProductItemList();
  // 콘솔에 등록된 상품 목록 반환
  return products;
}
```

**구매 요청:**

```typescript
import { purchaseProduct } from '@apps-in-toss/framework';

async function purchase(productId: string) {
  try {
    const result = await purchaseProduct({
      productId: productId,
    });

    if (result.status === 'PURCHASED') {
      // 상품 지급 처리
      await grantProduct(result.orderId);
    }
  } catch (error) {
    console.error('구매 실패:', error);
  }
}
```

**미완료 주문 복구:**

```typescript
import { getPendingOrders, completeProductGrant } from '@apps-in-toss/framework';

async function recoverPendingOrders() {
  const pendingOrders = await getPendingOrders();

  for (const order of pendingOrders) {
    // 상품 지급
    await grantProduct(order.orderId);

    // 지급 완료 처리
    await completeProductGrant({
      orderId: order.orderId,
    });
  }
}
```

### 주문 상태 코드

| 상태 | 설명 |
|------|------|
| PURCHASED | 거래 완료, 지급 확인됨 |
| PAYMENT_COMPLETED | 결제 완료, 지급 대기 중 |
| FAILED | 결제 거부됨 |
| REFUNDED | 환불 완료 |
| ORDER_IN_PROGRESS | 처리 중 |

### 환불 정책

| 플랫폼 | 환불 처리 |
|--------|----------|
| Google Play | 48시간 이내 자동 처리 |
| App Store | Apple이 직접 처리 |

---

## mTLS 인증서

### 필요 기능

mTLS 인증서가 필요한 API:

- 토스 로그인
- 토스페이
- 인앱 결제
- 기능성 푸시/알림
- 프로모션 (토스 포인트)

### 인증서 발급

1. 콘솔 접속
2. 미니앱 선택
3. mTLS 인증서 탭 이동
4. "인증서 발급" 클릭
5. 인증서 파일 다운로드 (PEM, P12)

### 인증서 적용

**Python:**

```python
import requests

response = requests.get(
    'https://apps-in-toss-api.toss.im/endpoint',
    cert=('/path/to/client-cert.pem', '/path/to/client-key.pem')
)
```

**Node.js:**

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  cert: fs.readFileSync('/path/to/client-cert.pem'),
  key: fs.readFileSync('/path/to/client-key.pem'),
  rejectUnauthorized: true,
};

const agent = new https.Agent(options);

fetch('https://apps-in-toss-api.toss.im/endpoint', {
  agent: agent
});
```

**Kotlin (Spring):**

```kotlin
import org.springframework.web.client.RestTemplate
import org.apache.http.impl.client.HttpClients
import org.apache.http.ssl.SSLContextBuilder
import java.io.File

val sslContext = SSLContextBuilder.create()
    .loadKeyMaterial(
        File("/path/to/keystore.p12"),
        "password".toCharArray(),
        "password".toCharArray()
    )
    .build()

val httpClient = HttpClients.custom()
    .setSSLContext(sslContext)
    .build()
```

### 인증서 갱신

**갱신 일정:**
- 유효기간: 390일
- 만료 1개월 전: 이메일 알림
- 만료 1주 전: 콘솔 알림
- 만료 1일 전: 긴급 알림

**갱신 절차:**

1. 콘솔에서 새 인증서 발급
2. 서버에 새 인증서 배포
3. 기존 인증서 폐기

---

## 방화벽 설정

### Inbound (앱인토스 → 파트너)

```text
IP 주소:
- 117.52.3.11, 211.115.96.11, 106.249.5.11
- 117.52.3.80~87, 211.115.96.80~87, 106.249.5.80~87

포트: 443
```

### Outbound (파트너 → 앱인토스)

**로그인/메시징:**
```text
Domain: apps-in-toss-api.toss.im
IP: 117.52.3.192, 211.115.96.192, 106.249.5.192
Port: 443
```

**결제:**
```text
Domain: pay-apps-in-toss-api.toss.im
IP: 117.52.3.195, 211.115.96.195, 106.249.5.195
Port: 443
```

---

## 다음 단계

- 마케팅 기능: [marketing.md](./marketing.md)
- 출시 준비: [launch.md](./launch.md)
- 수익화: [monetization.md](./monetization.md)

---

Version: 2.0.0
Last Updated: 2026-01-18
