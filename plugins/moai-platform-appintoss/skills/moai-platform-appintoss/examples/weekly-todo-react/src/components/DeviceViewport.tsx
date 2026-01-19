import { useEffect } from 'react';
import { getPlatformOS } from '@apps-in-toss/web-framework';

export function DeviceViewport() {
  const isIOS = getPlatformOS() === 'ios';

  useEffect(() => {
    const styles = {
      '--min-height': `${window.innerHeight}px`,
    };

    if (isIOS) {
      Object.assign(styles, {
        '--bottom-padding': `max(env(safe-area-inset-bottom), 20px)`,
        '--top-padding': `max(env(safe-area-inset-top), 20px)`,
      });
    }

    for (const [key, value] of Object.entries(styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);

  return null;
}
