import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-camera',

  plugins: [appsInToss({
    permissions: [
      {
        name: 'camera',
        access: 'access',
      },
    ],
    brand: {
      displayName: '카메라 예제',
      icon: 'https://static.toss.im/appsintoss/73/fe26bdc6-b0e5-467d-aaeb-0444474c84db.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
