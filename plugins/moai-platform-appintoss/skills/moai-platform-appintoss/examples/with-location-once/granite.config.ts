import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from '@granite-js/plugin-router';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'with-location-once',
  plugins: [
    appsInToss({
      permissions: [
        {
          name: 'geolocation',
          access: 'access',
        },
      ],
      brand: {
        displayName: '현재 위치 정보 예제',
        icon: 'https://static.toss.im/appsintoss/73/62958236-e21c-4e1c-aa59-5332ef6cf6df.png',
        primaryColor: '#3B70E3',
        bridgeColorMode: 'basic',
      },
    }),
    router(),
  ],
});
