import { env } from '@granite-js/plugin-env';
import { router } from '@granite-js/plugin-router';
import { appsInToss } from '@apps-in-toss/framework/plugins';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'with-app-login',

  plugins: [
    appsInToss({
      permissions: [],
      brand: {
        displayName: '앱 로그인 예제',
        icon: 'https://static.toss.im/appsintoss/73/6e532508-d5a9-4018-85b9-4c80bb2f0073.png',
        primaryColor: '#3B70E3',
        bridgeColorMode: 'basic',
      },
    }),
    env({
      SERVER_BASE_URL: 'http://localhost:4000', // 로컬 서버 주소를 입력해 주세요.
    }),
    router(),
  ],
});
