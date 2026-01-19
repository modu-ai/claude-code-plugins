import '../styles/swipeGestureHandler.css';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface SwipeGestureHandlerComponentOptions {
  getIsSorting: () => boolean;
  children: string;
}

export class SwipeGestureHandlerComponent {
  /**
   * 초기 스와이프 오프셋 값이에요. 스와이프 시작 전에는 항상 0이에요.
   */
  private static readonly INITIAL_SWIPE_OFFSET = 0;

  /**
   * 이 거리만큼 스와이프하면 스와이프 동작이 트리거돼요.
   */
  private static readonly SWIPE_TRIGGER_DISTANCE = 70;

  /**
   * 스와이프가 최대한으로 이동할 수 있는 거리예요.
   */
  private static readonly FULL_SWIPE_DISTANCE = 80;

  private $element: JQuery;
  private dragStartX: number | null = null;
  private dragMoveX: number = SwipeGestureHandlerComponent.INITIAL_SWIPE_OFFSET;
  private isFullySwiped: boolean = false;
  private getIsSorting: () => boolean;

  constructor({ getIsSorting, children }: SwipeGestureHandlerComponentOptions) {
    this.getIsSorting = getIsSorting;

    this.$element = $(
      `<div class="swipe-gesture-container">
         ${children}
       </div>`
    );

    this.bindEvents();
  }

  private bindEvents() {
    this.$element.on('touchstart', (event) => this.handleTouchStart(event));
    this.$element.on('touchmove', (event) => this.handleTouchMove(event));
    this.$element.on('touchend', () => this.handleTouchEnd());
  }

  private handleTouchStart(event: JQuery.TouchEventBase) {
    const isSorting = this.getIsSorting();

    if (isSorting) {
      return;
    }

    this.dragStartX = event.originalEvent?.touches[0].clientX || 0;
  }

  private handleTouchMove(event: JQuery.TouchEventBase) {
    const isSorting = this.getIsSorting();

    if (this.dragStartX === null || isSorting) {
      return;
    }

    const moveDistance =
      this.dragStartX - (event.originalEvent?.touches[0].clientX || 0);
    const limitedMoveDistance = Math.min(
      moveDistance,
      SwipeGestureHandlerComponent.FULL_SWIPE_DISTANCE
    );

    this.dragMoveX = limitedMoveDistance;
    this.updateTransform();
  }

  private handleTouchEnd() {
    const inInitialPosition =
      this.dragMoveX === SwipeGestureHandlerComponent.INITIAL_SWIPE_OFFSET;

    if (inInitialPosition) {
      return;
    }

    if (this.dragMoveX >= SwipeGestureHandlerComponent.SWIPE_TRIGGER_DISTANCE) {
      this.dragMoveX = SwipeGestureHandlerComponent.FULL_SWIPE_DISTANCE;
      this.isFullySwiped = true;
      generateHapticFeedback({ type: 'softMedium' });
    } else {
      this.dragMoveX = SwipeGestureHandlerComponent.INITIAL_SWIPE_OFFSET;
      this.isFullySwiped = false;
    }
    this.updateTransform();
  }

  private updateTransform() {
    this.$element.css('transform', `translateX(-${this.dragMoveX || 0}px)`);
    this.$element.css(
      'transition',
      this.isFullySwiped
        ? 'transform 0.2s ease-in-out'
        : 'transform 0.3s ease-out'
    );
  }

  public render(): JQuery {
    return this.$element;
  }
}
