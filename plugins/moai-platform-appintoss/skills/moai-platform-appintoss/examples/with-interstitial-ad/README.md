# Interstitial Ad Example

![React Native](../assets/tags/tag-react-native.svg)
![WebView](../assets/tags/tag-webview.svg)
![Toss App](../assets/tags/tag-toss-app.svg)

`loadAppsInTossAdMob`을 사용해 광고를 로드하고, `showAppsInTossAdMob`으로 광고를 노출하는 예제예요.  
[Google AdMob](https://support.google.com/admob/answer/6066980?hl=ko)에서는 사용자 경험 측면에서 전면 광고를 화면 이동 전에 먼저 보여주는 방식을 권장하고 있어요.  
💡 광고 유형은 앱인토스 콘솔에서 광고 그룹 생성 시 리워드 광고 또는 전면 광고를 선택할 수 있어요.

<img src="../assets/examples/with-interstitial-ad-example-image.png" alt="example image" width="1010px"/>

<br />

## 📲 체험하기

<img src="../assets/qr-codes/with-interstitial-ad-qr-code.svg" ait="qr code" width="100px" />&nbsp;

<br />

## 🚀 설치 및 실행 방법

1. **ZIP 파일**을 다운로드하고 압축을 풀어주세요.

2. `.yarnrc.yml` 파일의 `npmAuthToken` 항목에, [toss-design-system 그룹](https://tossmini-docs.toss.im/tds-react-native/setup-npm/)에 초대된 npm 계정의 토큰 값을 입력해주세요.

3. 필요한 패키지를 설치해요.

   ```
   yarn install
   ```

4. 번들 파일을 생성해요.

   ```
   yarn build
   ```

5. 앱인토스 콘솔에 [앱 번들 업로드](https://developers-apps-in-toss.toss.im/release/overview.html#_1-%E1%84%8B%E1%85%A2%E1%86%B8-%E1%84%87%E1%85%A5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF-%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3)를 하고 테스트해요.

<br />

## 📌 참고사항

- [loadAppsInTossAdMob](https://developers-apps-in-toss.toss.im/bedrock/reference/framework/%EA%B4%91%EA%B3%A0/loadAppsInTossAdMob.html)
- [showAppsInTossAdMob](https://developers-apps-in-toss.toss.im/bedrock/reference/framework/%EA%B4%91%EA%B3%A0/showAppsInTossAdMob.html)
