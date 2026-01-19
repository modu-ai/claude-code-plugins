import { getOperationalEnvironment } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GetOperationalEnvController')
export class GetOperationalEnvController extends Component {
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
        const env = getOperationalEnvironment();
        alert(`Environment: ${env}`);
    }
}

