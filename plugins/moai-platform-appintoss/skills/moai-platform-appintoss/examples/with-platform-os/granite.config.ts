import { defineConfig } from "@granite-js/react-native/config";
import { router } from "@granite-js/plugin-router";
import { appsInToss } from '@apps-in-toss/framework/plugins';

export default defineConfig({
  scheme: "intoss",
  appName: 'with-platform-os',

  plugins: [appsInToss({
    permissions: [],
    brand: {
      displayName: '운영체제(OS) 예제',
      icon: 'https://static.toss.im/appsintoss/73/dd347ed3-3a48-4a2d-b96d-67415a8d4530.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
