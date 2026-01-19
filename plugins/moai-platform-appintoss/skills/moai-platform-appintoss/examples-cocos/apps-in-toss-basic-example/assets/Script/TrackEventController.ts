import { Analytics } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('TrackEventController')
export class TrackEventController extends Component {
    start() {
        // 화면 표시 이벤트
        Analytics.screen({ log_name: 'cocos_screen_view' });
        
        // 노출 이벤트
        Analytics.impression({ log_name: 'cocos_impression_event' });
        
        const button = this.node.getComponent(Button);
        if (button) {
            this.node.on('click', this.onClick, this);
        }
    }

    onDestroy() {
        this.node.off('click', this.onClick, this);
    }

    async onClick() {
        Analytics.click({ log_name: 'cocos_click_event' });
    }
}

