import { _decorator, Button, Component, Node, Label, EditBox, Color, Layout, UITransform, view, Graphics } from 'cc';
import { GoogleAdMob } from '@apps-in-toss/web-framework';
const { ccclass } = _decorator;

const DEFAULT_AD_GROUP_ID = 'ait-ad-test-rewarded-id';

@ccclass('TossAdMobManager')
export class TossAdMobManager extends Component {
    private adGroupId: string = DEFAULT_AD_GROUP_ID;
    private loadResult: any = {};
    private showResult: any = {};
    private rewardedResult: any = {};
    private events: any[] = [];
    private isSupported: boolean = false;

    // UI 컴포넌트 참조
    private adGroupIdInput: EditBox | null = null;
    private loadButton: Button | null = null;
    private showButton: Button | null = null;
    private resultLabel: Label | null = null;
    private container: Node | null = null;

    start() {
        try {
            this.isSupported = GoogleAdMob.loadAppsInTossAdMob.isSupported();
            console.log('[TossAdMobManager] GoogleAdMob isSupported:', this.isSupported);
            if (!this.isSupported) {
                console.warn('[TossAdMobManager] 현재 환경에서는 AdMob이 지원되지 않습니다.');
            }
        } catch (error) {
            console.warn('[TossAdMobManager] GoogleAdMob 사용 불가:', error);
        }

        // 동적으로 UI 생성
        this.createUI();
    }

    onDestroy() {
        // 컴포넌트 파괴 시 이벤트 해제
        this.loadButton?.node.off(Button.EventType.CLICK, this.onClickLoadAd, this);
        this.showButton?.node.off(Button.EventType.CLICK, this.onClickShowAd, this);
    }

    /**
     * 동적으로 UI 컴포넌트 생성
     */
    private createUI() {
        const canvas = this.node;
        const visibleSize = view.getVisibleSize();

        // 메인 컨테이너 생성
        this.container = new Node('Container');
        const containerTransform = this.container.addComponent(UITransform);
        containerTransform.setContentSize(visibleSize.width, visibleSize.height);
        this.container.setPosition(0, 0, 0);
        canvas.addChild(this.container);

        // 컴포넌트 크기 설정
        const titleFontSize = 56;
        const supportFontSize = 32;
        const inputContainerHeight = 100;
        const resultHeight = 400;
        const buttonContainerHeight = 120;
        const spacingY = 40;
        const horizontalPadding = 80;
        
        // 전체 콘텐츠 높이 계산 (중앙 배치용)
        const titleHeight = titleFontSize + 20;
        const supportHeight = supportFontSize + 20;
        const totalContentHeight = titleHeight + supportHeight + inputContainerHeight + resultHeight + buttonContainerHeight + (spacingY * 4);
        
        // 화면 중앙 배치를 위한 상단 padding 계산
        const topPadding = Math.max(0, (visibleSize.height - totalContentHeight) / 2);
        
        // 레이아웃 설정 (큼직큼직하게)
        const layout = this.container.addComponent(Layout);
        layout.type = Layout.Type.VERTICAL;
        layout.spacingY = spacingY;
        layout.paddingTop = topPadding;
        layout.paddingLeft = horizontalPadding;
        layout.paddingRight = horizontalPadding;
        layout.paddingBottom = 0;

        // 제목 라벨 (더 크게)
        const titleLabel = this.createLabel('AdMob 테스트 화면', titleFontSize, Color.WHITE);
        this.container.addChild(titleLabel);

        // 지원 여부 표시 (더 크게)
        const supportLabel = this.createLabel(
            `지원 여부: ${this.isSupported ? '지원됨' : '지원되지 않음'}`,
            supportFontSize,
            this.isSupported ? Color.GREEN : Color.RED
        );
        this.container.addChild(supportLabel);

        // Ad Group ID 입력 필드 (더 크게)
        const inputContainer = new Node('InputContainer');
        const inputTransform = inputContainer.addComponent(UITransform);
        inputTransform.setContentSize(visibleSize.width - horizontalPadding * 2, inputContainerHeight);
        this.container.addChild(inputContainer);

        const inputLabel = this.createLabel('Ad Group ID:', supportFontSize, Color.WHITE);
        const inputContainerWidth = visibleSize.width - horizontalPadding * 2;
        inputLabel.setPosition(-inputContainerWidth / 2 + 120, 0, 0);
        inputContainer.addChild(inputLabel);

        // EditBox 생성 (CSS 스타일 적용, 더 크게)
        const editBoxNode = new Node('EditBox');
        const editBoxTransform = editBoxNode.addComponent(UITransform);
        // inputContainer 내부에서 사용 가능한 너비 계산 (라벨 너비 + 간격 고려)
        const editBoxWidth = inputContainerWidth - 300; // 라벨 영역 제외
        const editBoxHeight = 80;
        editBoxTransform.setContentSize(editBoxWidth, editBoxHeight);
        // inputContainer 내부에서 오른쪽으로 배치 (라벨 다음에 위치)
        editBoxNode.setPosition(-inputContainerWidth / 2 + 300 + editBoxWidth / 2, 0, 0);
        
        // 배경 및 테두리용 Graphics 컴포넌트
        const backgroundGraphics = editBoxNode.addComponent(Graphics);
        const padding = 20;
        const borderWidth = 1;
        const borderColor = new Color(204, 204, 204, 255); // #ccc
        const bgColor = new Color(255, 255, 255, 255); // 흰색 배경
        
        // 테두리 그리기 (외곽)
        backgroundGraphics.strokeColor = borderColor;
        backgroundGraphics.lineWidth = borderWidth;
        backgroundGraphics.rect(
            -editBoxWidth / 2,
            -editBoxHeight / 2,
            editBoxWidth,
            editBoxHeight
        );
        backgroundGraphics.stroke();
        
        // 배경 그리기 (테두리 안쪽)
        backgroundGraphics.fillColor = bgColor;
        backgroundGraphics.rect(
            -editBoxWidth / 2 + borderWidth,
            -editBoxHeight / 2 + borderWidth,
            editBoxWidth - borderWidth * 2,
            editBoxHeight - borderWidth * 2
        );
        backgroundGraphics.fill();
        
        // EditBox 컴포넌트 추가
        this.adGroupIdInput = editBoxNode.addComponent(EditBox);
        this.adGroupIdInput.maxLength = -1; // 길이 제한 없음
        this.adGroupIdInput.string = DEFAULT_AD_GROUP_ID;
        this.adGroupIdInput.placeholder = 'Ad Group ID를 입력하세요';
        
        // EditBox의 텍스트 영역 설정 (padding 적용)
        const textAreaWidth = editBoxWidth - padding * 2 - borderWidth * 2;
        const textAreaHeight = editBoxHeight - borderWidth * 2;
        
        // EditBox의 내장 텍스트 Label 설정 함수
        const updateEditBoxLabels = () => {
            if (!this.adGroupIdInput || !editBoxNode) return;
            
            // EditBox의 자식 노드에서 Label 컴포넌트를 찾아서 설정
            const children = editBoxNode.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const label = child.getComponent(Label);
                if (label) {
                    const currentText = this.adGroupIdInput?.string || '';
                    const isPlaceholder = currentText.length === 0 || label.string === this.adGroupIdInput?.placeholder;
                    
                    if (isPlaceholder) {
                        // placeholder Label
                        label.color = new Color(150, 150, 150, 255);
                        label.string = 'Ad Group ID를 입력하세요';
                    } else {
                        // 텍스트 Label
                        label.color = new Color(0, 0, 0, 255); // 검은색
                    }
                    
                    label.fontSize = 32;
                    label.horizontalAlign = Label.HorizontalAlign.LEFT;
                    label.verticalAlign = Label.VerticalAlign.CENTER;
                    
                    // 위치 조정 (padding 적용, 왼쪽 정렬)
                    const labelTransform = child.getComponent(UITransform);
                    if (labelTransform) {
                        labelTransform.setContentSize(textAreaWidth, textAreaHeight);
                        // 왼쪽에서 padding만큼 떨어진 위치에 배치
                        child.setPosition(
                            -editBoxWidth / 2 + padding + borderWidth + textAreaWidth / 2,
                            0,
                            0
                        );
                    }
                }
            }
        };
        
        // EditBox의 내장 텍스트는 EditBox의 자식 노드로 생성되므로, 약간의 지연 후 접근
        this.scheduleOnce(() => {
            updateEditBoxLabels();
        }, 0.1);
        
        // EditBox 이벤트 핸들러 설정
        editBoxNode.on(EditBox.EventType.EDITING_DID_ENDED, () => {
            if (this.adGroupIdInput) {
                this.adGroupId = this.adGroupIdInput.string || DEFAULT_AD_GROUP_ID;
            }
            updateEditBoxLabels();
        });
        
        // 텍스트 변경 시에도 색상과 위치 유지
        editBoxNode.on(EditBox.EventType.TEXT_CHANGED, () => {
            this.scheduleOnce(() => {
                updateEditBoxLabels();
            }, 0);
        });
        
        // 포커스 이벤트에도 업데이트
        editBoxNode.on(EditBox.EventType.EDITING_DID_BEGAN, () => {
            this.scheduleOnce(() => {
                updateEditBoxLabels();
            }, 0);
        });
        
        inputContainer.addChild(editBoxNode);

        // 결과 표시 라벨 (더 크게)
        const resultNode = new Node('ResultLabel');
        const resultTransform = resultNode.addComponent(UITransform);
        resultTransform.setContentSize(visibleSize.width - horizontalPadding * 2, resultHeight);
        this.resultLabel = resultNode.addComponent(Label);
        this.resultLabel.fontSize = 28;
        this.resultLabel.color = Color.WHITE;
        this.resultLabel.string = '결과가 여기에 표시됩니다.';
        this.resultLabel.overflow = Label.Overflow.RESIZE_HEIGHT;
        this.resultLabel.enableWrapText = true;
        this.container.addChild(resultNode);

        // 버튼 컨테이너 (더 크게)
        const buttonContainer = new Node('ButtonContainer');
        const buttonContainerTransform = buttonContainer.addComponent(UITransform);
        buttonContainerTransform.setContentSize(visibleSize.width - horizontalPadding * 2, buttonContainerHeight);
        const buttonLayout = buttonContainer.addComponent(Layout);
        buttonLayout.type = Layout.Type.HORIZONTAL;
        buttonLayout.spacingX = 40;
        this.container.addChild(buttonContainer);

        // 광고 로드 버튼
        this.loadButton = this.createButton('광고 로드', new Color(100, 150, 255, 255), Color.WHITE);
        buttonContainer.addChild(this.loadButton.node);
        // 버튼 클릭 이벤트 등록
        this.loadButton.node.on(Button.EventType.CLICK, this.onClickLoadAd, this);

        // 광고 보여주기 버튼
        this.showButton = this.createButton('광고 보여주기', new Color(100, 255, 150, 255), Color.BLACK);
        buttonContainer.addChild(this.showButton.node);
        // 버튼 클릭 이벤트 등록
        this.showButton.node.on(Button.EventType.CLICK, this.onClickShowAd, this);

        // 초기 결과 업데이트
        this.updateResultLabel();
    }

    /**
     * 라벨 생성 헬퍼 함수
     */
    private createLabel(text: string, fontSize: number, color: Color): Node {
        const labelNode = new Node('Label');
        const labelTransform = labelNode.addComponent(UITransform);
        labelTransform.setContentSize(800, fontSize + 20);
        const label = labelNode.addComponent(Label);
        label.string = text;
        label.fontSize = fontSize;
        label.color = color;
        return labelNode;
    }

    /**
     * 버튼 생성 헬퍼 함수 (스타일 적용, 더 크게)
     */
    private createButton(text: string, bgColor: Color, labelColor: Color): Button {
        const buttonNode = new Node('Button');
        const buttonTransform = buttonNode.addComponent(UITransform);
        const buttonWidth = 280;
        const buttonHeight = 100;
        buttonTransform.setContentSize(buttonWidth, buttonHeight);
        
        // 배경 및 테두리용 Graphics 컴포넌트
        const buttonGraphics = buttonNode.addComponent(Graphics);
        const borderWidth = 1;
        const borderColor = new Color(204, 204, 204, 255); // #ccc
        
        // 테두리 그리기 (외곽)
        buttonGraphics.strokeColor = borderColor;
        buttonGraphics.lineWidth = borderWidth;
        buttonGraphics.rect(
            -buttonWidth / 2,
            -buttonHeight / 2,
            buttonWidth,
            buttonHeight
        );
        buttonGraphics.stroke();
        
        // 배경 그리기 (테두리 안쪽)
        buttonGraphics.fillColor = bgColor;
        buttonGraphics.rect(
            -buttonWidth / 2 + borderWidth,
            -buttonHeight / 2 + borderWidth,
            buttonWidth - borderWidth * 2,
            buttonHeight - borderWidth * 2
        );
        buttonGraphics.fill();
        
        const button = buttonNode.addComponent(Button);
        button.transition = Button.Transition.COLOR;
        button.normalColor = bgColor;
        button.hoverColor = new Color(
            Math.min(255, bgColor.r + 30),
            Math.min(255, bgColor.g + 30),
            Math.min(255, bgColor.b + 30),
            255
        );
        button.pressedColor = new Color(
            Math.max(0, bgColor.r - 30),
            Math.max(0, bgColor.g - 30),
            Math.max(0, bgColor.b - 30),
            255
        );
        
        // 버튼 색상 변경 시 Graphics 배경도 함께 변경되도록 이벤트 처리
        const updateButtonColor = (color: Color) => {
            buttonGraphics.clear();
            // 테두리 다시 그리기
            buttonGraphics.strokeColor = borderColor;
            buttonGraphics.lineWidth = borderWidth;
            buttonGraphics.rect(
                -buttonWidth / 2,
                -buttonHeight / 2,
                buttonWidth,
                buttonHeight
            );
            buttonGraphics.stroke();
            // 배경 다시 그리기
            buttonGraphics.fillColor = color;
            buttonGraphics.rect(
                -buttonWidth / 2 + borderWidth,
                -buttonHeight / 2 + borderWidth,
                buttonWidth - borderWidth * 2,
                buttonHeight - borderWidth * 2
            );
            buttonGraphics.fill();
        };
        
        buttonNode.on(Node.EventType.TOUCH_START, () => {
            updateButtonColor(button.pressedColor);
        });
        buttonNode.on(Node.EventType.TOUCH_END, () => {
            updateButtonColor(button.normalColor);
        });
        buttonNode.on(Node.EventType.TOUCH_CANCEL, () => {
            updateButtonColor(button.normalColor);
        });

        const labelNode = new Node('ButtonLabel');
        const labelTransform = labelNode.addComponent(UITransform);
        labelTransform.setContentSize(buttonWidth, buttonHeight);
        const label = labelNode.addComponent(Label);
        label.string = text;
        label.fontSize = 32;
        label.color = labelColor;
        buttonNode.addChild(labelNode);

        return button;
    }

    /**
     * 결과 라벨 업데이트
     */
    private updateResultLabel() {
        if (!this.resultLabel) return;

        const result = {
            loadResult: this.loadResult,
            showResult: this.showResult,
            events: this.events,
            rewardedResult: this.rewardedResult,
            isSupported: this.isSupported,
        };

        this.resultLabel.string = JSON.stringify(result, null, 2);
    }

    public onClickLoadAd() {
        try {
            // EditBox에서 현재 값 가져오기
            if (this.adGroupIdInput) {
                this.adGroupId = this.adGroupIdInput.string || DEFAULT_AD_GROUP_ID;
            }

            if (!GoogleAdMob.loadAppsInTossAdMob.isSupported()) {
                console.warn('[TossAdMobManager] load: 지원되지 않는 환경입니다.');
                this.loadResult = { error: '지원되지 않는 환경입니다.', from: 'validation' };
                this.updateResultLabel();
                return;
            }

            console.log('[TossAdMobManager] load 시작:', { adGroupId: this.adGroupId });

            GoogleAdMob.loadAppsInTossAdMob({
                options: {
                    adGroupId: this.adGroupId,
                },
                onEvent: (event: any) => {
                    switch (event.type) {
                        case 'loaded':
                            this.loadResult = { success: true, from: 'onEvent', params: event.data };
                            console.log('[TossAdMobManager] load 성공:', this.loadResult);
                            break;

                        default:
                            this.events = [...this.events, { from: event.type }];
                            console.log('[TossAdMobManager] load 이벤트:', event.type, event);
                            break;
                    }
                    this.updateResultLabel();
                },
                onError: (error: any) => {
                    this.loadResult = { error: error instanceof Error ? error.message : error, from: 'onError' };
                    console.warn('[TossAdMobManager] load 에러:', this.loadResult);
                    this.updateResultLabel();
                },
            });
        } catch (error: any) {
            this.loadResult = { error: error instanceof Error ? error.message : error, isFatal: true };
            console.error('[TossAdMobManager] load 치명적 에러:', this.loadResult);
            this.updateResultLabel();
        }
    }

    public onClickShowAd() {
        try {
            // EditBox에서 현재 값 가져오기
            if (this.adGroupIdInput) {
                this.adGroupId = this.adGroupIdInput.string || DEFAULT_AD_GROUP_ID;
            }

            if (!GoogleAdMob.showAppsInTossAdMob.isSupported?.() && !GoogleAdMob.loadAppsInTossAdMob.isSupported()) {
                console.warn('[TossAdMobManager] show: 지원되지 않는 환경입니다.');
                this.showResult = { error: '지원되지 않는 환경입니다.', from: 'validation' };
                this.updateResultLabel();
                return;
            }

            console.log('[TossAdMobManager] show 시작:', { adGroupId: this.adGroupId });

            GoogleAdMob.showAppsInTossAdMob({
                options: {
                    adGroupId: this.adGroupId,
                },
                onEvent: (event: any) => {
                    if (event.type === 'userEarnedReward') {
                        this.rewardedResult = { ...event.data };
                        console.log('[TossAdMobManager] 보상 획득(userEarnedReward):', this.rewardedResult);
                    } else {
                        this.showResult = { success: true, from: 'onEvent', event };
                        console.log('[TossAdMobManager] show 이벤트:', event.type, event);
                    }
                    this.updateResultLabel();
                },
                onError: (error: any) => {
                    this.showResult = { error: error instanceof Error ? error.message : error, from: 'onError' };
                    console.warn('[TossAdMobManager] show 에러:', this.showResult);
                    this.updateResultLabel();
                },
            });
        } catch (error: any) {
            this.showResult = { error: error instanceof Error ? error.message : error, isFatal: true };
            console.error('[TossAdMobManager] show 치명적 에러:', this.showResult);
            this.updateResultLabel();
        }
    }
}