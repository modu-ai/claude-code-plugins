# 앱인토스 API Reference

이 문서는 앱인토스 개발을 위한 상세 API 레퍼런스입니다.

---

## 토스 로그인 API

### Base URL

```text
https://apps-in-toss-api.toss.im
```

### 토큰 발급 (Authorization Code 교환)

**Endpoint:** `POST /api-partner/v1/apps-in-toss/user/oauth2/generate-token`

**Headers:**

```text
Content-Type: application/json
```

**Request Body:**

```json
{
  "authorizationCode": "authorization_code_from_sdk",
  "referrer": "DEFAULT"
}
```

**Response (Success):**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "accessToken": "eyJraWQiOiJjZXJ0IiwiYWxnIjoiUlMyNTYifQ...",
    "refreshToken": "xNEYPASwWw0n1AxZUHU9KeGj8BitDyYo4wi8rpfkUcJwByVxpAdUzwtIaWGVL6vHdrXLCxIlHAQRPF9hHnFleTsHkqUXzc-_78sD_r1Uh5Ff9UCYfArx8LTn1Vk99dDb",
    "scope": "user_ci user_birthday user_nationality user_name user_phone user_gender",
    "tokenType": "Bearer",
    "expiresIn": 3599
  }
}
```

**Response (Failure):**

```json
{
  "resultType": "FAIL",
  "error": {
    "errorCode": "invalid_grant",
    "reason": "인가 코드가 만료되었거나 이미 사용되었습니다"
  }
}
```

참고사항:
- 인가 코드 유효시간: 10분
- 동일한 인가 코드로 중복 토큰 요청 불가

### 토큰 갱신

**Endpoint:** `POST /api-partner/v1/apps-in-toss/user/oauth2/refresh-token`

**Request Body:**

```json
{
  "refreshToken": "your_refresh_token"
}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "accessToken": "eyJ...",
    "refreshToken": "new_refresh_token",
    "expiresIn": 3599
  }
}
```

참고사항:
- RefreshToken 유효시간: 14일

### 사용자 정보 조회

**Endpoint:** `GET /api-partner/v1/apps-in-toss/user/oauth2/login-me`

**Headers:**

```text
Authorization: Bearer {accessToken}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "userKey": 443731104,
    "scope": "user_ci,user_birthday,user_nationality,user_name,user_phone,user_gender,user_key",
    "agreedTerms": ["terms_tag1", "terms_tag2"],
    "name": "ENCRYPTED_VALUE",
    "phone": "ENCRYPTED_VALUE",
    "birthday": "ENCRYPTED_VALUE",
    "ci": "ENCRYPTED_VALUE",
    "di": null,
    "gender": "ENCRYPTED_VALUE",
    "nationality": "ENCRYPTED_VALUE",
    "email": null
  }
}
```

응답 필드 설명:

| 필드 | 타입 | 암호화 | 설명 |
|------|------|--------|------|
| userKey | number | X | 고유 사용자 식별자 |
| scope | string | X | 승인된 권한 범위 |
| agreedTerms | list | X | 동의한 약관 목록 |
| name | string | O | 사용자 이름 |
| phone | string | O | 휴대폰 번호 |
| birthday | string | O | 생년월일 (yyyyMMdd) |
| ci | string | O | CI 값 |
| di | string | O | 항상 null 반환 |
| gender | string | O | MALE 또는 FEMALE |
| nationality | string | O | LOCAL 또는 FOREIGNER |
| email | string | O | 이메일 (미검증) |

### 개인정보 복호화

암호화 알고리즘: AES-256-GCM
키 길이: 256비트
IV/Nonce 길이: 12바이트 (암호문 앞에 붙음)

**TypeScript 복호화 예제:**

```typescript
import crypto from 'crypto';

function decryptPersonalInfo(
  encryptedText: string,
  base64EncodedAesKey: string,
  aad: string
): string {
  const IV_LENGTH = 12;
  const decoded = Buffer.from(encryptedText, 'base64');

  const iv = decoded.subarray(0, IV_LENGTH);
  const authTag = decoded.subarray(decoded.length - 16);
  const encrypted = decoded.subarray(IV_LENGTH, decoded.length - 16);

  const key = Buffer.from(base64EncodedAesKey, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  decipher.setAuthTag(authTag);
  decipher.setAAD(Buffer.from(aad));

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
}
```

**Kotlin 복호화 예제:**

```kotlin
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec

class PersonalInfoDecryptor {
    fun decrypt(
        encryptedText: String,
        base64EncodedAesKey: String,
        aad: String
    ): String {
        val IV_LENGTH = 12
        val decoded = Base64.getDecoder().decode(encryptedText)
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        val keyByteArray = Base64.getDecoder().decode(base64EncodedAesKey)
        val key = SecretKeySpec(keyByteArray, "AES")
        val iv = decoded.copyOfRange(0, IV_LENGTH)
        val nonceSpec = GCMParameterSpec(16 * Byte.SIZE_BITS, iv)

        cipher.init(Cipher.DECRYPT_MODE, key, nonceSpec)
        cipher.updateAAD(aad.toByteArray())

        return String(cipher.doFinal(decoded, IV_LENGTH, decoded.size - IV_LENGTH))
    }
}
```

**PHP 복호화 예제:**

```php
<?php
class PersonalInfoDecryptor {
    public function decrypt($encryptedText, $base64EncodedAesKey, $aad) {
        $IV_LENGTH = 12;
        $decoded = base64_decode($encryptedText);
        $keyByteArray = base64_decode($base64EncodedAesKey);
        $iv = substr($decoded, 0, $IV_LENGTH);
        $ciphertext = substr($decoded, $IV_LENGTH);

        $tag = substr($ciphertext, -16);
        $ciphertext = substr($ciphertext, 0, -16);

        $decrypted = openssl_decrypt(
            $ciphertext,
            'aes-256-gcm',
            $keyByteArray,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            $aad
        );

        return $decrypted;
    }
}
?>
```

### 로그인 연결 해제

**Access Token으로 해제:**

```bash
POST /api-partner/v1/apps-in-toss/user/oauth2/access/remove-by-access-token
Authorization: Bearer {access_token}
```

**User Key로 해제:**

```bash
POST /api-partner/v1/apps-in-toss/user/oauth2/access/remove-by-user-key
Authorization: Bearer {access_token}
Content-Type: application/json

{"userKey": 443731103}
```

### 연결 해제 콜백

사용자가 토스 앱 설정에서 서비스를 연결 해제하면 콜백이 호출됩니다.

**GET 방식:**

```text
GET ${callback_url}?userKey=${userKey}&referrer=${referrer}
```

**POST 방식:**

```json
POST ${callback_url}
Content-Type: application/json

{"userKey": 443731103, "referrer": "UNLINK"}
```

**Referrer 값:**

| 값 | 트리거 |
|----|--------|
| UNLINK | 사용자가 토스 앱 설정에서 수동 해제 |
| WITHDRAWAL_TERMS | 사용자가 서비스 약관 동의 철회 |
| WITHDRAWAL_TOSS | 사용자가 토스 계정 삭제 |

---

## 토스페이 API

### Base URL

```text
https://pay-apps-in-toss-api.toss.im
```

### 결제 생성

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/make-payment`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request Body:**

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
| orderNo | String | Y | 고유 주문번호 (최대 50자, 영숫자 및 특수문자 _-:.^@') |
| productDesc | String | Y | 상품 설명 (최대 255자, UTF-8) |
| amount | Integer | Y | 총 결제 금액 |
| amountTaxFree | Integer | Y | 비과세 금액 (과세 상품은 0) |
| amountTaxable | Integer | N | 과세 금액 (생략 시 자동 계산) |
| amountVat | Integer | N | 부가세 (생략 시 자동 계산) |
| amountServiceFee | Integer | N | 봉사료 |
| enablePayMethods | String | N | 결제 수단 필터 (TOSS_MONEY, CARD, null) |
| cashReceipt | Boolean | N | 현금영수증 발행 여부 |
| cashReceiptTradeOption | String | N | 영수증 유형 (GENERAL, CULTURE, PUBLIC_TP) |
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

### 결제 실행

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/execute-payment`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request Body:**

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
    "discountedAmount": 0,
    "paidAmount": 10000,
    "payMethod": "CARD",
    "payToken": "O1NZck9XME8ureeVJVJP67",
    "transactionId": "45a77cf4-5577-4d5c-8827-4d4dd328bf12",
    "cardCompanyCode": "4",
    "cardCompanyName": "국민",
    "cardAuthorizationNo": "12345678",
    "spreadOut": "0",
    "noInterest": "false",
    "salesCheckLinkUrl": "https://...",
    "cardMethodType": "CREDIT",
    "cardNumber": "1234-****-****-5678",
    "cardUserType": "PERSONAL",
    "cardNum4Print": "5678",
    "cardBinNumber": "123456"
  }
}
```

### 결제 환불

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/refund-payment`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request Body:**

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
    "refundedPaidAmount": 10000,
    "transactionId": "45a77cf4-5577-4d5c-8827-4d4dd328bf12"
  }
}
```

### 결제 상태 조회

**Endpoint:** `POST /api-partner/v1/apps-in-toss/pay/get-payment-status`

**Request Body:**

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
    "mode": "LIVE",
    "payStatus": "PAY_COMPLETE",
    "payMethod": "CARD",
    "amount": 10000,
    "discountedAmount": 0,
    "paidAmount": 10000,
    "refundableAmount": 10000,
    "transactions": [...]
  }
}
```

**결제 상태 코드:**

| 코드 | 설명 |
|------|------|
| PAY_STANDBY | 결제 대기 중 |
| PAY_APPROVED | 사용자 인증 완료 |
| PAY_COMPLETE | 결제 완료 |
| REFUND_SUCCESS | 환불 완료 |
| SETTLEMENT_COMPLETE | 정산 완료 |

### 은행 코드

| 코드 | 은행 |
|------|------|
| 004 | KB국민은행 |
| 020 | 우리은행 |
| 081 | 하나은행 |
| 088 | 신한은행 |
| 092 | 토스뱅크 |

### 카드사 코드

| 코드 | 카드사 |
|------|--------|
| 1 | 신한 |
| 2 | 현대 |
| 4 | 국민 |
| 5 | 롯데 |

---

## 푸시 알림 API

### 메시지 발송

**Endpoint:** `POST /api-partner/v1/apps-in-toss/messenger/send-message`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request Body:**

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

참고: userName 변수는 자동으로 사용자 이름으로 채워지므로 입력 불필요

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
    "sentFriendtalkCount": 0,
    "detail": {
      "sentPush": [
        {
          "contentId": "toss:PUSH~~~~"
        }
      ]
    }
  }
}
```

**Response 필드:**

| 필드 | 설명 |
|------|------|
| msgCount | 총 발송 성공 건수 |
| sentPushCount | 푸시 알림 발송 건수 |
| sentInboxCount | 인앱 알림 발송 건수 |
| sentSmsCount | SMS 발송 건수 |
| sentAlimtalkCount | 알림톡 발송 건수 |
| sentFriendtalkCount | 친구톡 발송 건수 |

---

## 인앱 결제 API

### 상품 목록 조회

SDK의 `getProductItemList` 함수를 사용하여 콘솔에 등록된 상품을 조회합니다.

### 구매 요청

SDK를 통해 구매 다이얼로그를 표시하고 트랜잭션을 처리합니다.

SDK 1.1.3 이상에서는 상품 지급 로직이 자동 실행됩니다.

### 미완료 주문 복구

`getPendingOrders` 함수로 완료되었으나 지급되지 않은 주문을 확인합니다.

`completeProductGrant` 함수로 상품 지급 완료 처리합니다.

요구 버전: Android 5.231.0+, iOS 5.231.0+

### 주문 상태 조회 (API)

**Endpoint:** `POST /api-partner/v1/apps-in-toss/order/get-order-status`

**Headers:**

```text
Content-Type: application/json
x-toss-user-key: {userKey}
```

**Request Body:**

```json
{
  "orderId": "13c9a1ff-2baa-4495-bbfa-a0826ba8c7c0"
}
```

**주문 상태 코드:**

| 상태 | 설명 |
|------|------|
| PURCHASED | 거래 완료, 지급 확인됨 |
| PAYMENT_COMPLETED | 결제 완료, 지급 대기 중 |
| FAILED | 결제 거부됨 |
| REFUNDED | 환불 완료 |
| ORDER_IN_PROGRESS | 처리 중 |
| NOT_FOUND | 주문 없음 |
| MINIAPP_MISMATCH | 상품 불일치 |

---

## 프로모션 API (토스 포인트)

### 게임용 프로모션

SDK의 `grantPromotionRewardForGame` 함수를 사용합니다.

`getUserKeyForGame`에서 받은 해시값으로 사용자 식별합니다.

요구 버전: 토스 앱 5.232.0 이상

주의: 중복 호출 시 동일 사용자에게 중복 지급될 수 있으므로 방어 로직 필수

### 비게임용 프로모션 (API)

**Step 1: 프로모션 리워드 키 생성**

**Endpoint:** `POST /api-partner/v1/apps-in-toss/promotion/execute-promotion/get-key`

**Headers:**

```text
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
동일 키 재사용 시 에러 코드 4113 발생

**Step 2: 프로모션 리워드 지급**

**Endpoint:** `POST /api-partner/v1/apps-in-toss/promotion/execute-promotion`

**Headers:**

```text
x-toss-user-key: {userKey}
```

**Request Body:**

```json
{
  "promotionCode": "01JPPJ6SB66BQXXDAKRQZ6SZD7",
  "key": "3oBpxjUgl5r66edcVi7ynHGIjhzr9KOka6FfEKikev0=",
  "amount": 100
}
```

**Step 3: 지급 상태 확인**

**Endpoint:** `POST /api-partner/v1/apps-in-toss/promotion/execution-result`

**Request Body:**

```json
{
  "promotionCode": "01JPPJ6SB66BQXXDAKRQZ6SZD7",
  "key": "3oBpxjUgl5r66edcVi7ynHGIjhzr9KOka6FfEKikev0="
}
```

**상태 값:**

| 상태 | 설명 |
|------|------|
| SUCCESS | 지급 완료 |
| PENDING | 처리 중 |
| FAILED | 지급 실패 |

**에러 코드:**

| 코드 | 메시지 | 해결 방법 |
|------|--------|----------|
| 4100 | 프로모션 없음 | 콘솔에서 프로모션 존재 확인 |
| 4109 | 프로모션 미실행 | 콘솔에서 시작하거나 예산 확인 |
| 4110 | 지급/회수 불가 | 시스템 오류, 재시도 구현 |
| 4111 | 지급 이력 없음 | 지급 기록 확인 |
| 4112 | 프로모션 잔액 부족 | 콘솔에서 예산 충전 |
| 4113 | 이미 지급/회수됨 | 새 키 생성 필요 |
| 4114 | 단건 지급 한도 초과 | 금액 확인 |
| 4116 | 최대 지급액 초과 | 금액 조정 또는 예산 증액 |

---

## 토스 인증 API

### Base URL

```text
https://cert.toss.im
```

### 최소 요구사항

SDK: 1.2.1 이상
토스 앱 (본인인증): 5.233.0 이상
토스 앱 (원터치 인증): 5.236.0 이상

### Step 1: Access Token 발급

**Endpoint:** `POST https://oauth2.cert.toss.im/token`

**Headers:**

```text
Content-Type: application/x-www-form-urlencoded
```

**Request:**

```text
grant_type=client_credentials
scope=ca
client_id=YOUR_CLIENT_ID
client_secret=YOUR_CLIENT_SECRET
```

**cURL 예제:**

```bash
curl --request POST 'https://oauth2.cert.toss.im/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode 'client_id=YOUR_CLIENT_ID' \
  --data-urlencode 'client_secret=YOUR_CLIENT_SECRET' \
  --data-urlencode 'scope=ca'
```

**Response:**

```json
{
  "access_token": "eyJraWQiOiJjZXJ0IiwiYWxnIjoiUlMyNTYifQ...",
  "scope": "ca",
  "token_type": "Bearer",
  "expires_in": 31536000
}
```

### Step 2: 인증 요청

**Endpoint:** `POST /api/v2/sign/user/auth/id/request`

**Headers:**

```text
Authorization: Bearer {ACCESS_TOKEN}
Content-Type: application/json
```

**Option A: 개인정보 입력 인증**

```json
{
  "requestType": "USER_PERSONAL",
  "requestUrl": "intoss://my-app",
  "triggerType": "APP_SCHEME",
  "userName": "v1$...$encrypted_name",
  "userPhone": "v1$...$encrypted_phone",
  "userBirthday": "v1$...$encrypted_birthday",
  "sessionKey": "v1$...$encrypted_key"
}
```

**Option B: 원터치 인증**

```json
{
  "requestType": "USER_NONE",
  "requestUrl": "intoss://my-app"
}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "txId": "d7b7273b-407b-46be-a9d8-97d2e895b009",
    "appScheme": "intoss://...",
    "androidAppUri": "...",
    "iosAppUri": "...",
    "requestedDt": "2022-02-13T17:52:22+09:00"
  }
}
```

### Step 3: 인증 화면 호출

SDK의 `appsInTossSignTossCert()` 함수에 `txId`를 전달하여 토스 앱 인증 화면을 호출합니다.

### Step 4: 인증 상태 확인

**Endpoint:** `POST /api/v2/sign/user/auth/id/status`

**Request Body:**

```json
{
  "txId": "d7b7273b-407b-46be-a9d8-97d2e895b009"
}
```

**상태 값:**

| 상태 | 설명 |
|------|------|
| REQUESTED | 인증 요청됨 |
| IN_PROGRESS | 사용자 인증 중 |
| COMPLETED | 사용자 인증 완료 (최종 확인 아님) |
| EXPIRED | 세션 만료 |

### Step 5: 인증 결과 조회

**Endpoint:** `POST /api/v2/sign/user/auth/id/result`

**Request Body:**

```json
{
  "txId": "c1ce9214-9878-4751-b433-0c96641b0e13",
  "sessionKey": "v1$...$encrypted_key"
}
```

참고: sessionKey는 요청 시와 다른 새로운 키 사용

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "txId": "c1ce9214-9878-4751-b433-0c96641b0e13",
    "status": "COMPLETED",
    "signature": "MIIJCAYJKoZIhvcN...",
    "completedDt": "2022-02-13T18:01:53+09:00",
    "requestedDt": "2022-02-13T18:00:26+09:00",
    "personalData": {
      "ci": "v1$...$encrypted_ci",
      "name": "v1$...$encrypted_name",
      "birthday": "v1$...$encrypted_birthday",
      "gender": "v1$...$encrypted_gender",
      "nationality": "v1$...$encrypted_nationality",
      "di": "v1$...$encrypted_di",
      "ageGroup": "v1$...$encrypted_age"
    }
  }
}
```

결과 조회 제한: 완료 후 60분 이내, 최대 2회

---

## mTLS 인증서 설정

### Python

```python
import requests

response = requests.get(
    'https://apps-in-toss-api.toss.im/endpoint',
    cert=('/path/to/client-cert.pem', '/path/to/client-key.pem')
)
```

### Node.js

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

### Kotlin (Spring)

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

val requestFactory = HttpComponentsClientHttpRequestFactory(httpClient)
val restTemplate = RestTemplate(requestFactory)
```

---

## 방화벽 설정

### Inbound (앱인토스 → 파트너)

IP 주소:
- 117.52.3.11, 211.115.96.11, 106.249.5.11
- 117.52.3.80~87, 211.115.96.80~87, 106.249.5.80~87

포트: 443

### Outbound (파트너 → 앱인토스)

로그인/메시징:
- apps-in-toss-api.toss.im
- IP: 117.52.3.192, 211.115.96.192, 106.249.5.192

결제:
- pay-apps-in-toss-api.toss.im
- IP: 117.52.3.195, 211.115.96.195, 106.249.5.195

포트: 443

---

## 에러 응답 형식

**표준 에러 응답:**

```json
{
  "resultType": "FAIL",
  "error": {
    "errorCode": "ERROR_CODE",
    "reason": "에러 설명",
    "data": {}
  }
}
```

---

## 테스트 환경

### 샌드박스 다운로드

Android: 콘솔에서 APK 다운로드
iOS: 콘솔에서 다운로드 또는 App Store

### 테스트 제한사항

샌드박스에서 불가능한 기능:
- 애널리틱스
- 공유 리워드
- 인앱 광고
- 가로 모드 게임
- 네비게이션 바 공유

위 기능은 콘솔의 QR 코드로 토스 앱에서 테스트해야 합니다.

### CORS 설정

프로덕션: https://<appName>.apps.tossmini.com
테스트: https://<appName>.private-apps.tossmini.com

### 환경별 차이점

샌드박스: HTTP 허용
프로덕션: HTTPS만 허용

iOS 13.4+: 서드파티 쿠키 완전 차단 - 토큰 기반 인증 사용

---

## 출시 체크리스트

### 공통 체크리스트

- [ ] TDS 설치 및 적용
- [ ] 라이트 모드 전용 (다크 모드 미지원)
- [ ] 핀치 줌 비활성화
- [ ] 접근성 요구사항 충족
- [ ] 보안 취약점 점검 완료
- [ ] 번들 크기 100MB 이하

### 게임 체크리스트

- [ ] 전체 화면 구현
- [ ] 연령 등급 표시
- [ ] 네비게이션 바 구현 (닫기 버튼, 더보기 버튼)
- [ ] 사운드 on/off 토글
- [ ] 게임 프로필 등록 후 리더보드 접근
- [ ] 테스트 광고 ID 제거
- [ ] 데이터 지속성 테스트

### 비게임 체크리스트

- [ ] 토스 로그인만 사용 (서드파티 로그인 금지)
- [ ] 토스페이만 사용 (다른 결제 수단 금지)
- [ ] 기능성 푸시만 사용 (비게임)
- [ ] 리스트 정렬/검색/필터링 지원
- [ ] 모든 기능 버튼 동작 확인

---

## 자주 발생하는 문제

### 로컬 서버 연결 안됨

appName과 granite 설정 확인
8081/5173 포트 열기

### mTLS 인증 오류

인증서/키 파일 경로 확인
인증서 유효기간 확인
방화벽 설정 확인

### iOS 쿠키 차단

iOS 13.4+에서 서드파티 쿠키 차단
토큰 기반 인증으로 변경

### CORS 에러

Origin 허용 목록에 앱인토스 도메인 추가

### 토스앱에서 미니앱 안열림

토스 앱 최신 버전 확인
granite.config.ts의 icon, brand 값 확인

---

## 공식 문서 링크

개발자센터: https://developers-apps-in-toss.toss.im

SDK 레퍼런스: https://developers-apps-in-toss.toss.im/bedrock/reference

---

Version: 1.0.0
Last Updated: 2026-01-18
