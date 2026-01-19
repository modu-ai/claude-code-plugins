import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'weekly-todo-jquery',
  web: {
    host: 'localhost',
    port: 8080,
    commands: {
      dev: 'webpack serve --mode development',
      build: 'webpack',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '위클리 투두 - 제이쿼리',
    icon: 'https://static.toss.im/appsintoss/73/ce76ba9b-c384-49b8-8bb9-2017f903f455.png',
    primaryColor: '#3B70E3',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'partner',
  },
});
