import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-contacts',

  plugins: [appsInToss({
    permissions: [
      {
        name: 'contacts',
        access: 'read',
      },
    ],
    brand: {
      displayName: '연락처 예제',
      icon: 'https://static.toss.im/appsintoss/73/6ed2ce25-00bf-4f2b-bc14-b5fcdcf8ecc2.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
