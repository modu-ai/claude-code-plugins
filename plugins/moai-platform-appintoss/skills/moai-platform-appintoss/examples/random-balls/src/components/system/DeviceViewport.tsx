import { useEffect } from 'react';

export function DeviceViewport() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    const styles = {
      '--min-height': `${window.innerHeight}px`,
    };

    if (isIOS) {
      Object.assign(styles, {
        '--bottom-padding': `max(env(safe-area-inset-bottom), 20px)`,
        '--top-padding': `max(env(safe-area-inset-top), 48px)`,
      });
    }

    for (const [key, value] of Object.entries(styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);

  return null;
}
