import { useEffect } from 'react';
import { setScreenAwakeMode } from '@apps-in-toss/web-framework';

export function ScreenAwake() {
  useEffect(() => {
    setScreenAwakeMode({ enabled: true });
    return () => {
      setScreenAwakeMode({ enabled: false });
    };
  }, []);
  return null;
}
