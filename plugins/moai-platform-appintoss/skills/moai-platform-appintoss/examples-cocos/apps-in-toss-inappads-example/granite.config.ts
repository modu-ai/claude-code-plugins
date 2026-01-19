import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'cocos-inappads-example',
  brand: {
    displayName: 'cocos-inappads-example', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://static.toss.im/ml-product/tosst_22367_1_rembg_upscaled.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
    bridgeColorMode: 'inverted',
  },
  web: {
    host: 'localhost',
    port: 7456,
    commands: {
      dev: 'npm run cocos:dev',
      build: 'npm run cocos:build',
    },
  },
  permissions: [],
  outdir: 'build',
  webViewProps: {
    type: "game",
    bounces: false,
    pullToRefreshEnabled: false,
    allowsBackForwardNavigationGestures: false
  }
});
