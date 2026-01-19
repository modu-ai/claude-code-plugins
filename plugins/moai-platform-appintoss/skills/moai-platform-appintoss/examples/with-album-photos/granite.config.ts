import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from "@granite-js/plugin-router";
import { defineConfig } from "@granite-js/react-native/config";

export default defineConfig({
  scheme: "intoss",
  appName: 'with-album-photos',

  plugins: [appsInToss({
    permissions: [
      {
        name: 'photos',
        access: 'read',
      },
    ],
    brand: {
      displayName: '앨범 사진 예제',
      icon: 'https://static.toss.im/appsintoss/73/b6cbd5f4-4846-43b1-a95e-76c2c41adc06.png',
      primaryColor: '#3B70E3',
      bridgeColorMode: 'basic',
    },
  }), router()]
});
