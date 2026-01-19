import { getTossAppVersion } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GetTossAppVerController')
export class GetTossAppVerController extends Component {
    start() {
        const button = this.node.getComponent(Button);
        if (button) {
            this.node.on('click', this.onClick, this);
        }
    }

    onDestroy() {
        this.node.off('click', this.onClick, this);
    }

    onClick() {
        const appVersion = getTossAppVersion();
        alert(`Version: ${appVersion}`);
    }
}

