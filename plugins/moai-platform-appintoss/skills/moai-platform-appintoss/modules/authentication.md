# 인증 가이드 (Authentication)

앱인토스 인증 시스템 연동 가이드입니다.

---

## 토스 로그인 (OAuth2)

토스 로그인은 OAuth2 기반 7단계 플로우로 구현됩니다.

### Base URL

```text
https://apps-in-toss-api.toss.im
```

### 인증 플로우

```
1. SDK의 appLogin 함수로 인가 코드 요청
       ↓
2. 토스 앱에서 사용자 동의 화면 표시
       ↓
3. 사용자 동의 후 authorization_code 발급 (유효시간 10분)
       ↓
4. 앱에서 authorization_code를 서버로 전송
       ↓
5. 서버에서 토스 API로 토큰 교환 요청
       ↓
6. access_token, refresh_token 발급
       ↓
7. 사용자 정보 조회 후 앱에 전달
```

### 토큰 유효시간

| 토큰 | 유효시간 |
|------|----------|
| Authorization Code | 10분 |
| Access Token | 1시간 (3600초) |
| Refresh Token | 14일 |

### Step 1: SDK 로그인 요청

```typescript
import { appLogin } from '@apps-in-toss/framework';

async function login() {
  try {
    const result = await appLogin({
      scopes: ['user_name', 'user_phone', 'user_birthday', 'user_gender'],
    });

    // authorization_code를 서버로 전송
    await sendToServer(result.authorizationCode);
  } catch (error) {
    console.error('로그인 실패:', error);
  }
}
```

### Step 2: 토큰 교환 (서버)

**Endpoint:** `POST /api-partner/v1/apps-in-toss/user/oauth2/generate-token`

**Request:**

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
    "refreshToken": "xNEYPASwWw0n1AxZUHU9KeGj8BitDyYo4wi8rpfkUcJ...",
    "scope": "user_ci user_birthday user_nationality user_name user_phone user_gender",
    "tokenType": "Bearer",
    "expiresIn": 3599
  }
}
```

### Step 3: 사용자 정보 조회

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

### 개인정보 복호화

개인정보는 AES-256-GCM으로 암호화되어 전달됩니다.

**암호화 사양:**
- 알고리즘: AES-256-GCM
- IV 길이: 12바이트 (암호문 앞에 붙음)
- Auth Tag 길이: 16바이트 (암호문 뒤에 붙음)

**TypeScript 복호화 코드:**

```typescript
import crypto from 'crypto';

function decryptPersonalInfo(encryptedData: string, secretKey: string): string {
  const buffer = Buffer.from(encryptedData, 'base64');
  const iv = buffer.subarray(0, 12);
  const authTag = buffer.subarray(buffer.length - 16);
  const encrypted = buffer.subarray(12, buffer.length - 16);

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(secretKey, 'hex'),
    iv
  );
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}

// AAD를 사용하는 경우
function decryptWithAAD(
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

**Kotlin 복호화 코드:**

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

**PHP 복호화 코드:**

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

### 토큰 갱신

**Endpoint:** `POST /api-partner/v1/apps-in-toss/user/oauth2/refresh-token`

**Request:**

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

---

## 게임 로그인

게임 미니앱 전용 간소화된 로그인입니다.

### 특징

- 서버 불필요
- 사용자 동의 불필요
- 해시값 기반 사용자 식별
- 프로모션 연동용

### 요구사항

| 항목 | 버전 |
|------|------|
| SDK | 1.4.0 이상 |
| 토스 앱 | 5.232.0 이상 |
| 카테고리 | 게임 미니앱만 사용 가능 |

### 구현

```typescript
import { getUserKeyForGame } from '@apps-in-toss/framework';

async function gameLogin() {
  try {
    const result = await getUserKeyForGame();

    // result.userKeyHash: 사용자 식별 해시값
    // 프로모션 지급 등에 활용
    console.log('User Hash:', result.userKeyHash);

    return result.userKeyHash;
  } catch (error) {
    console.error('게임 로그인 실패:', error);
  }
}
```

### 사용 시나리오

1. 게임 시작 시 자동 호출
2. 리더보드 점수 제출 시 사용자 식별
3. 프로모션 리워드 지급 시 사용자 확인

---

## 토스 인증 (토스인증)

본인인증 서비스를 연동합니다.

### Base URL

```text
https://cert.toss.im
```

### 요구사항

| 항목 | 버전 |
|------|------|
| SDK | 1.2.1 이상 |
| 토스 앱 (본인인증) | 5.233.0 이상 |
| 토스 앱 (원터치 인증) | 5.236.0 이상 |

### Step 1: Access Token 발급

**Endpoint:** `POST https://oauth2.cert.toss.im/token`

**Request:**

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
    "requestedDt": "2022-02-13T17:52:22+09:00"
  }
}
```

### Step 3: SDK 인증 화면 호출

```typescript
import { appsInTossSignTossCert } from '@apps-in-toss/framework';

async function startCertification(txId: string) {
  try {
    await appsInTossSignTossCert({ txId });
    // 인증 완료 후 결과 확인
  } catch (error) {
    console.error('인증 실패:', error);
  }
}
```

### Step 4: 인증 결과 조회

**Endpoint:** `POST /api/v2/sign/user/auth/id/result`

**Request:**

```json
{
  "txId": "c1ce9214-9878-4751-b433-0c96641b0e13",
  "sessionKey": "v1$...$encrypted_key"
}
```

**Response:**

```json
{
  "resultType": "SUCCESS",
  "success": {
    "txId": "c1ce9214-9878-4751-b433-0c96641b0e13",
    "status": "COMPLETED",
    "signature": "MIIJCAYJKoZIhvcN...",
    "completedDt": "2022-02-13T18:01:53+09:00",
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

**제한사항:**
- 결과 조회: 완료 후 60분 이내
- 최대 조회 횟수: 2회

---

## 로그인 연결 해제

### Access Token으로 해제

```bash
POST /api-partner/v1/apps-in-toss/user/oauth2/access/remove-by-access-token
Authorization: Bearer {access_token}
```

### User Key로 해제

```bash
POST /api-partner/v1/apps-in-toss/user/oauth2/access/remove-by-user-key
Authorization: Bearer {access_token}
Content-Type: application/json

{"userKey": 443731103}
```

### 연결 해제 콜백

사용자가 토스 앱 설정에서 서비스를 연결 해제하면 콜백이 호출됩니다.

**Referrer 값:**

| 값 | 트리거 |
|----|--------|
| UNLINK | 사용자가 토스 앱 설정에서 수동 해제 |
| WITHDRAWAL_TERMS | 사용자가 서비스 약관 동의 철회 |
| WITHDRAWAL_TOSS | 사용자가 토스 계정 삭제 |

---

## 다음 단계

- 결제 연동: [payment.md](./payment.md)
- 마케팅 기능: [marketing.md](./marketing.md)

---

Version: 2.0.0
Last Updated: 2026-01-18
