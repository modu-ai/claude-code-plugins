import { appLogin } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('AppLoginController')
export class AppLoginController extends Component {
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
        try {
            const { authorizationCode, referrer } = await appLogin();
            
            // 획득한 인가 코드(`authorizationCode`)와 `referrer`를 서버로 전달해요.
            alert(`인가 코드: ${authorizationCode}\nReferrer: ${referrer || '없음'}`);
            
            // TODO: 서버로 authorizationCode와 referrer 전달
            // 예: await fetch('/api/login', { 
            //     method: 'POST', 
            //     body: JSON.stringify({ authorizationCode, referrer }) 
            // });
        } catch (error) {
            alert(error);
            console.error('App login error:', error);
        }
    }
}

