import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-clipboard-text',

  plugins: [appsInToss({
    permissions: [
      {
        name: 'clipboard',
        access: 'read',
      },
      {
        name: 'clipboard',
        access: 'write',
      },
    ],
    brand: {
      displayName: '클립보드 텍스트 예제',
      icon: 'https://static.toss.im/appsintoss/73/ce808547-0fd1-4554-9b1c-6c6ea073cdff.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
