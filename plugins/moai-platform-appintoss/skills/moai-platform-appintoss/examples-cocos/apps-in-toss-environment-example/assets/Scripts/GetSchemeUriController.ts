import { getSchemeUri } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GetSchemeUriController')
export class GetSchemeUriController extends Component {
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
        const schemeUri = getSchemeUri();
        alert(`Scheme URI: ${schemeUri}`);
    }
}

