import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-share-link',

  plugins: [appsInToss({
    brand: {
      displayName: '링크 공유 예제', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
      primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
      icon: 'https://static.toss.im/appsintoss/73/95be328c-33c6-4b37-aa4a-4b7655727b8d.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
      bridgeColorMode: 'basic',
    },
    permissions: [],
  }), router()]
});
