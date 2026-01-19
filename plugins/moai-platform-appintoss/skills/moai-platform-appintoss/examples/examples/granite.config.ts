import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from '@granite-js/plugin-router';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'examples',

  plugins: [
    appsInToss({
      permissions: [],
      brand: {
        displayName: '예제 모음',
        icon: 'https://static.toss.im/appsintoss/73/8f851469-fc86-4b25-93ff-725c1c0dd853.png',
        primaryColor: '#3B70E3',
        bridgeColorMode: 'basic',
      },
    }),
    router(),
  ],
});
