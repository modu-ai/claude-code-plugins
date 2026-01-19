import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-location-callback',

  plugins: [appsInToss({
    permissions: [
      {
        name: 'geolocation',
        access: 'access',
      },
    ],
    brand: {
      displayName: '위치 변경 시 콜백 예제',
      icon: 'https://static.toss.im/appsintoss/73/8ed0bce3-4f03-4ee0-8c31-af727e9e1ae1.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
