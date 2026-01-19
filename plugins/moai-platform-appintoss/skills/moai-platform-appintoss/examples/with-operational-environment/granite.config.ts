import { defineConfig } from "@granite-js/react-native/config";
import { router } from "@granite-js/plugin-router";
import { appsInToss } from '@apps-in-toss/framework/plugins';

export default defineConfig({
  scheme: "intoss",
  appName: 'with-operational-environment',

  plugins: [appsInToss({
    permissions: [],
    brand: {
      displayName: '운영 환경 예제',
      icon: 'https://static.toss.im/appsintoss/73/abd8af5f-79d8-49a0-8d4c-929f7ee4cbba.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
