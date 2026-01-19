<script setup lang="ts">
import draggable from 'vuedraggable';
import type { MoveEvent } from 'sortablejs';
import type { TaskItemType } from '../composables/useTaskState';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface Props {
  title: string;
  items: TaskItemType[];
  emptyMessage: string;
}

interface VueDraggableMoveEvent extends MoveEvent {
  relatedContext: {
    element: TaskItemType;
  };
  draggedContext: {
    element: TaskItemType;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'update:isSorting', isSorting: boolean): void;
}>();

const handleDragStart = () => {
  emit('update:isSorting', true);
};

const handleDragEnd = () => {
  emit('update:isSorting', false);
  generateHapticFeedback({ type: 'softMedium' });
};

const handleMoveCheck = (event: VueDraggableMoveEvent) => {
  const isRelatedBlocked = event.relatedContext.element.isLike;
  const isDraggedBlocked = event.draggedContext.element.isLike;

  const draggable = !(isRelatedBlocked || isDraggedBlocked);

  return draggable;
};
</script>

<template>
  <div>
    <h3 class="title">{{ props.title }}</h3>
    <draggable
      tag="ul"
      itemKey="id"
      :list="items"
      :handle="'.draggable-handle'"
      @start="handleDragStart"
      @end="handleDragEnd"
      :move="handleMoveCheck"
      :animation="200"
      class="task-list"
    >
      <template #item="{ element }">
        <div>
          <slot :item="element"></slot>
        </div>
      </template>
    </draggable>
    <div v-if="props.items.length === 0" class="task-empty">
      {{ props.emptyMessage }}
    </div>
  </div>
</template>

<style scoped>
.title {
  margin: 0 0 20px 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gray-700);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.task-empty {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-gray-500);
}
</style>
