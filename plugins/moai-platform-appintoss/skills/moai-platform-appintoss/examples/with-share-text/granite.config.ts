import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from '@granite-js/plugin-router';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'with-share-text',

  plugins: [
    appsInToss({
      permissions: [],
      brand: {
        displayName: '텍스트 공유 예제',
        icon: 'https://static.toss.im/appsintoss/73/26d2de27-1401-4279-9377-f97e30f293ec.png',
        primaryColor: '#3B70E3',
        bridgeColorMode: 'basic',
      },
    }),
    router(),
  ],
});
