import { setDeviceOrientation } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component, view, macro, screen, ResolutionPolicy } from 'cc';
const { ccclass } = _decorator;

@ccclass('SetDeviceOrientationController')
export class SetDeviceOrientationController extends Component {
    private _isLandscape: boolean = false;

    start() {
        const button = this.node.getComponent(Button);
        if (button) {
            this.node.on('click', this.onClick, this);
        }
    }

    onDestroy() {
        this.node.off('click', this.onClick, this);
    }

    async onClick() {
        this._isLandscape = !this._isLandscape;
        
        if (this._isLandscape) {
            view.setOrientation(macro.ORIENTATION_LANDSCAPE);
            await setDeviceOrientation({ type: 'landscape' });
        } else {
            view.setOrientation(macro.ORIENTATION_PORTRAIT);
            await setDeviceOrientation({ type: 'portrait' });
        }
        
        this.scheduleOnce(() => {
            const visibleSize = screen.windowSize;
            view.setDesignResolutionSize(visibleSize.width, visibleSize.height, ResolutionPolicy.SHOW_ALL);
            view.resizeWithBrowserSize(true);
        }, 0);
    }
}
