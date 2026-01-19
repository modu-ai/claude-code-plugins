import { getUserKeyForGame } from '@apps-in-toss/web-framework';
import { _decorator, Button, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('GetUserKeyForGameController')
export class GetUserKeyForGameController extends Component {
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
        const result = await getUserKeyForGame();

        if (!result) {
            alert('지원하지 않는 앱 버전이에요.');
          } else if (result === 'INVALID_CATEGORY') {
            alert('게임 카테고리가 아닌 미니앱이에요.');
          } else if (result === 'ERROR') {
            alert('사용자 키 조회 중 오류가 발생했어요.');
          } else if (result.type === 'HASH') {
            alert(`사용자 키: ${result.hash}`);
            // 여기에서 사용자 키를 사용해 게임 데이터를 관리할 수 있어요.
          }
    }
}

