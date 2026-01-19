import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'weekly-todo-vue',
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite --host',
      build: 'vue-tsc -b && vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '위클리 투두 - 뷰',
    icon: 'https://static.toss.im/appsintoss/73/082d577f-fcd5-41e1-8d54-d2dca123faa1.png',
    primaryColor: '#3B70E3',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'partner',
  },
});
