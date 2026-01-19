import { useEffect } from 'react';
import { setDeviceOrientation } from '@apps-in-toss/web-framework';

export function DeviceOrientationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setDeviceOrientation({ type: 'landscape' });

    return () => {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;

      if (isLandscape) {
        setDeviceOrientation({ type: 'portrait' });
      }
    };
  }, []);

  return <>{children}</>;
}
