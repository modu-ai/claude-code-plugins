<script setup lang="ts">
import type { TaskItemType } from '../composables/useTaskState';
import Checkbox from './Checkbox.vue';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import SwipeGestureHandler from './SwipeGestureHandler.vue';

interface Props {
  task: TaskItemType;
  isSorting: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'toggleTaskLike', id: string, isLike: boolean): void;
  (event: 'moveTaskToOtherList', task: TaskItemType): void;
  (event: 'deleteTask', id: string): void;
}>();

const handleLikeToggle = (like: boolean) => {
  emit('toggleTaskLike', props.task.id, like);
  generateHapticFeedback({ type: 'softMedium' });
};

const handleDoneToggle = (done: boolean) => {
  emit('deleteTask', props.task.id);
  emit('moveTaskToOtherList', { ...props.task, isDone: done });
  generateHapticFeedback({ type: 'softMedium' });
};

const handleDeleteTask = () => {
  emit('deleteTask', props.task.id);
  generateHapticFeedback({ type: 'softMedium' });
};
</script>

<template>
  <li :class="['task-item', { 'not-draggable': task.isLike }]">
    <SwipeGestureHandler :isSorting="props.isSorting">
      <div class="task-inner">
        <Checkbox
          :initial-value="props.task.isDone"
          @update:checked="handleDoneToggle"
        >
          <i class="ri-checkbox-blank-circle-line inactive-icon"></i>
          <i class="ri-checkbox-circle-line active-icon"></i>
        </Checkbox>
        <p
          :class="{
            'done-text': task.isDone === true,
            'todo-text': task.isDone === false,
          }"
        >
          {{ task.text }}
        </p>
        <Checkbox
          :initial-value="props.task.isLike"
          class="task-like"
          @update:checked="handleLikeToggle"
        >
          <i class="ri-star-fill active-icon"></i>
          <i class="ri-star-line inactive-icon"></i>
        </Checkbox>
        <div class="draggable-handle">
          <i class="ri-draggable"></i>
        </div>
      </div>
    </SwipeGestureHandler>
    <button class="delete-button" @click="handleDeleteTask">삭제</button>
  </li>
</template>

<style scoped>
.task-item {
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: var(--rounded-sm);
}

.sortable-ghost {
  opacity: 0;
}

.sortable-drag div {
  border-radius: var(--rounded-xs);
  overflow: hidden;
  background: var(--color-gray-300);
}

.task-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  height: fit-content;
  min-height: 52px;
}

.delete-button {
  position: absolute;
  right: 1px;
  width: 90px;
  height: 100%;
  background-color: var(--color-red-400);
  border-radius: var(--rounded-xs);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-gray-200);
  border: 1px solid var(--color-gray-200);
}

.task-like .ri-star-fill {
  color: var(--color-yellow-400);
}

.todo-text {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-gray-800);
}

.done-text {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-gray-400);
  text-decoration: line-through;
}

.not-draggable .draggable-handle {
  pointer-events: none;
}

.draggable-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  font-size: var(--icon-size-md);
  color: var(--color-gray-400);
}
</style>
