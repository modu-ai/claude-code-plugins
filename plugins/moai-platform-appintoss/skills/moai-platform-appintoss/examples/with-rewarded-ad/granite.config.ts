import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-rewarded-ad',

  plugins: [appsInToss({
    brand: {
      displayName: '보상형 광고 예제', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
      primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
      icon: 'https://static.toss.im/appsintoss/73/9c121dc9-ab35-417c-bb84-b9b49e7465fb.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
      bridgeColorMode: 'basic',
    },
    permissions: [],
  }), router()]
});
