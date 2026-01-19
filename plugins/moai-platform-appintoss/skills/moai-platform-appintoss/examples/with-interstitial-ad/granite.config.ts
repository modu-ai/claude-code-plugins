import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-interstitial-ad',

  plugins: [appsInToss({
    brand: {
      displayName: '전면 광고 예제', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
      primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
      icon: 'https://static.toss.im/appsintoss/73/cefe974d-171e-4839-a478-e5af1dd39f15.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
      bridgeColorMode: 'basic',
    },
    permissions: [],
  }), router()]
});
