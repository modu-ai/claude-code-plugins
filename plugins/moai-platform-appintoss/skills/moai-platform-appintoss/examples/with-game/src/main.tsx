import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouterProvider } from '@/router';
import { DeviceOrientationProvider } from '@/components/DeviceOrientationProvider';
import '@/styles/reset.css';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceOrientationProvider>
      <AppRouterProvider />
    </DeviceOrientationProvider>
  </StrictMode>
);
