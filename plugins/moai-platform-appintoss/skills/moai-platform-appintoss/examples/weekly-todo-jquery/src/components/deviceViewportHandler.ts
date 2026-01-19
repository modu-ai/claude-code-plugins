import { getPlatformOS } from '@apps-in-toss/web-framework';

export class DeviceViewportHandler {
  private isIOS = getPlatformOS() === 'ios';

  constructor() {
    this.init();
  }

  private init() {
    const styles = {
      '--min-height': `${window.innerHeight}px`,
    };

    if (this.isIOS) {
      Object.assign(styles, {
        '--bottom-padding': `max(env(safe-area-inset-bottom), 20px)`,
        '--top-padding': `max(env(safe-area-inset-top), 20px)`,
      });
    }

    for (const [key, value] of Object.entries(styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }
}
