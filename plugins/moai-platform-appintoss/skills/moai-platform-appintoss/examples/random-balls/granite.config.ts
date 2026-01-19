import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'random-balls',
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite --host',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '랜덤 볼',
    icon: 'https://static.toss.im/appsintoss/73/5f223e3b-4854-42d2-8993-83c042f6c01f.png',
    primaryColor: '#3B70E3',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'game',
  },
});
