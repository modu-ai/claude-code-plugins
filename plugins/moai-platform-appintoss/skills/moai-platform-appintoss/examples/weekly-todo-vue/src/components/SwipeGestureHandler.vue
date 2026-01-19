<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface Props {
  isSorting: boolean;
}

// 초기 스와이프 오프셋 값이에요. 스와이프 시작 전에는 항상 0이에요.
const INITIAL_SWIPE_OFFSET = 0;

// 이 거리만큼 스와이프하면 스와이프 동작이 트리거돼요.
const SWIPE_TRIGGER_DISTANCE = 70;

// 스와이프가 최대한으로 이동할 수 있는 거리예요.
const FULL_SWIPE_DISTANCE = 80;

const props = defineProps<Props>();
const dragStartX = ref<number | null>(null);
const dragMoveX = ref<number>(INITIAL_SWIPE_OFFSET);
const isFullySwiped = ref<boolean>(false);

const handleTouchStart = (event: TouchEvent) => {
  if (props.isSorting) {
    return;
  }

  dragStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
  if (dragStartX.value === null || props.isSorting) {
    return;
  }

  const moveDistance = dragStartX.value - event.touches[0].clientX;
  const limitedMoveDistance = Math.min(moveDistance, FULL_SWIPE_DISTANCE);
  dragMoveX.value = limitedMoveDistance;
};

const handleTouchEnd = () => {
  const inInitialPosition = dragMoveX.value === INITIAL_SWIPE_OFFSET;

  if (inInitialPosition) {
    return;
  }

  if (dragMoveX.value >= SWIPE_TRIGGER_DISTANCE) {
    dragMoveX.value = FULL_SWIPE_DISTANCE;
    isFullySwiped.value = true;
    generateHapticFeedback({ type: 'softMedium' });
  } else {
    dragMoveX.value = INITIAL_SWIPE_OFFSET;
    isFullySwiped.value = false;
  }
};

const containerStyle = computed<CSSProperties>(() => ({
  transform: `translateX(-${dragMoveX.value}px)`,
  transition: isFullySwiped.value
    ? 'transform 0.2s ease-in-out'
    : 'transform 0.3s ease-out',
  position: 'relative',
  width: '100%',
  paddingInline: '8px',
  zIndex: 50,
  backgroundColor: 'var(--color-gray-200)',
}));
</script>

<template>
  <div
    class="swipe-gesture-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    :style="containerStyle"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.swipe-gesture-container {
  position: relative;
  width: 100%;
  padding-inline: 8px;
  z-index: 50;
  background-color: var(--color-gray-200);
}
</style>
