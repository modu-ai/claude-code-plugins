# 앱인토스 Unity 개발 가이드

이 문서는 Unity 게임을 앱인토스 미니앱으로 변환하기 위한 가이드입니다.

---

## 개요

앱인토스는 기존 Unity 게임을 엔진 교체나 핵심 코드 수정 없이 WebGL 미니앱으로 변환할 수 있습니다.

### 지원 방식

- **Unity WebGL 빌드** - Unity 프로젝트를 WebGL로 빌드하여 앱인토스에 배포
- **기존 게임 이식** - 엔진 교체 없이 기존 Unity 게임을 앱인토스로 이식

---

## 준비 사항

### 1. 런타임 아키텍처 이해

앱인토스에서 Unity 게임은 WebGL 환경에서 실행됩니다:

- WebView 기반 렌더링
- JavaScript 브릿지를 통한 네이티브 기능 접근
- WASM (WebAssembly) 기반 게임 로직

### 2. 게임 호환성 사전 점검

Unity 프로젝트를 앱인토스로 이식하기 전 확인사항:

| 항목 | 확인 내용 |
|------|----------|
| 렌더링 파이프라인 | URP (Universal Render Pipeline) 권장 |
| 에셋 크기 | 번들 크기 100MB 이하 |
| 플랫폼 API | WebGL 호환 API만 사용 |
| 서드파티 플러그인 | WebGL 지원 여부 확인 |

### 3. 권장 Unity 버전

| 지원 상태 | Unity 버전 |
|----------|-----------|
| 권장 | Unity 2021.3 LTS 이상 |
| 지원 | Unity 2020.3 LTS 이상 |
| 미지원 | Unity 2019 이하 |

---

## 이식 (Porting)

### 이식 순서

```
1. Unity 프로젝트 준비
       ↓
2. WebGL 빌드 설정
       ↓
3. Apps in Toss SDK 연동
       ↓
4. 네이티브 기능 연동 (로그인, 결제, 광고)
       ↓
5. 성능 최적화
       ↓
6. 테스트 및 배포
```

### 직접 이식 방법

기존 Unity 프로젝트를 최소한의 수정으로 이식:

1. **Build Settings**에서 WebGL 플랫폼 선택
2. **Player Settings**에서 WebGL 설정 최적화
3. Apps in Toss SDK 패키지 임포트
4. JavaScript 브릿지 코드 연동

### Unity SDK 연동

앱인토스 Unity SDK를 통해 네이티브 기능 접근:

```csharp
// 토스 로그인 예제
using AppsInToss;

public class LoginController : MonoBehaviour
{
    public async void OnLoginButtonClick()
    {
        var result = await AppsInTossSDK.Login();
        if (result.IsSuccess)
        {
            string authCode = result.AuthorizationCode;
            // 서버로 인가 코드 전송
        }
    }
}
```

### 인앱 광고 연동

```csharp
// 보상형 광고 예제
using AppsInToss;

public class AdController : MonoBehaviour
{
    private bool isAdLoaded = false;

    public async void LoadRewardedAd()
    {
        var result = await AppsInTossSDK.LoadAd("ad_group_id");
        isAdLoaded = result.IsSuccess;
    }

    public async void ShowRewardedAd()
    {
        if (!isAdLoaded) return;

        var result = await AppsInTossSDK.ShowAd();
        if (result.IsRewarded)
        {
            // 리워드 지급
            GiveReward(result.RewardAmount);
        }
    }
}
```

---

## 성능 최적화

### 시작 속도 최적화

| 최적화 항목 | 방법 |
|------------|------|
| 로딩 시간 | 초기 로드 에셋 최소화 |
| 첫 프레임 | 스플래시 화면 경량화 |
| 스크립트 | AOT 컴파일 최적화 |

### 메모리 관리

WebGL 환경의 메모리 제한사항:

- **힙 크기 제한** - 브라우저별 메모리 한도 존재
- **가비지 컬렉션** - 수동 GC 호출 최소화
- **텍스처 압축** - ASTC, ETC2 포맷 권장

```csharp
// 메모리 최적화 예제
public class MemoryOptimizer : MonoBehaviour
{
    void OnDestroy()
    {
        // 사용하지 않는 에셋 해제
        Resources.UnloadUnusedAssets();
    }
}
```

### 렌더링 최적화

| 항목 | 권장 설정 |
|------|----------|
| Draw Call | 50 이하 |
| 폴리곤 수 | 씬당 10만 이하 |
| 텍스처 크기 | 2048x2048 이하 |
| 셰이더 | Mobile 셰이더 사용 |

### 에셋 최적화

- **AssetBundle** - 온디맨드 에셋 로딩
- **Addressables** - 효율적인 에셋 관리
- **AutoStreaming** - 자동 스트리밍 설정
- **WASM 코드 분할** - 초기 로드 크기 감소

### 플랫폼별 최적화

**iOS 최적화:**
- Metal 렌더러 최적화
- 메모리 풋프린트 관리

**파티클 시스템:**
- GPU 파티클 사용
- 파티클 수 제한

---

## 디버깅

### 예외 처리

```csharp
// WebGL 환경 예외 처리
try
{
    await AppsInTossSDK.SomeFunction();
}
catch (WebGLException ex)
{
    Debug.LogError($"WebGL Error: {ex.Message}");
}
```

### 프로파일링 도구

| 도구 | 용도 |
|------|------|
| Unity Profiler | 성능 분석 |
| Android CPU Profiler | 네이티브 성능 분석 |
| Chrome DevTools | WebGL 디버깅 |

---

## 배포 체크리스트

### 빌드 전 확인

- [ ] WebGL 2.0 타겟 설정
- [ ] 압축 포맷 설정 (Brotli 권장)
- [ ] 메모리 크기 설정 (256MB~512MB)
- [ ] 예외 처리 설정 (Explicit 권장)

### 성능 기준

| 항목 | 목표값 |
|------|--------|
| 초기 로딩 | 5초 이내 |
| 프레임레이트 | 30fps 이상 |
| 메모리 사용 | 300MB 이하 |
| 번들 크기 | 50MB 이하 권장 |

### 테스트

- [ ] 샌드박스 앱에서 테스트
- [ ] 토스 앱 QR 코드로 테스트
- [ ] iOS/Android 모두 테스트
- [ ] 저사양 기기 테스트

---

## 리소스

- **개발자센터 Unity 가이드**: https://developers-apps-in-toss.toss.im/unity/intro/overview.html
- **개발자 포럼**: Apps in Toss Developer Forum
- **GitHub 예제**: Unity 샘플 프로젝트

---

## 주의사항

### WebGL 제한사항

- 멀티스레딩 미지원
- 일부 네이티브 플러그인 미지원
- 파일 시스템 직접 접근 불가
- Socket 통신 제한 (WebSocket 사용)

### 권장사항

- URP (Universal Render Pipeline) 사용
- 모바일 최적화 에셋 사용
- 동적 배칭 활성화
- GPU Instancing 활용

---

Version: 1.0.0
Last Updated: 2026-01-19
Platform: Unity WebGL for Apps in Toss
