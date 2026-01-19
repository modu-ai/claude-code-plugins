import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-haptic-feedback',

  plugins: [appsInToss({
    permissions: [],
    brand: {
      displayName: '진동 알림 예제',
      icon: 'https://static.toss.im/appsintoss/73/e3b60edc-fd50-4a0b-924c-96e885d8a2de.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
