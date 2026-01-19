import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-network-status',

  plugins: [appsInToss({
    permissions: [],
    brand: {
      displayName: '네트워크 상태 예제',
      icon: 'https://static.toss.im/appsintoss/73/a5cfd424-27b2-466f-9694-3e2d90e380cd.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
