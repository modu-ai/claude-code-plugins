import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from '@granite-js/plugin-router';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'with-location-tracking',
  plugins: [
    appsInToss({
      permissions: [{ name: 'geolocation', access: 'access' }],
      brand: {
        displayName: '실시간 위치 정보 예제',
        icon: 'https://static.toss.im/appsintoss/73/327f609d-6428-436d-bafd-9a48f6f70bd0.png',
        primaryColor: '#3B70E3',
        bridgeColorMode: 'basic',
      },
    }),
    router(),
  ],
});
