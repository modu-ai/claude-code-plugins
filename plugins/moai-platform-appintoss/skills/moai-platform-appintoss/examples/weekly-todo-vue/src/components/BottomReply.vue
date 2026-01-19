<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { nanoid } from 'nanoid';
import { isBefore, startOfDay } from 'date-fns';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import type { TaskItemType } from '../composables/useTaskState';

interface Props {
  createAt: Date;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'addTodo', task: TaskItemType): void;
}>();
const inputValue = ref('');

const isDisabled = computed(() =>
  isBefore(startOfDay(props.createAt), startOfDay(new Date()))
);

const handleSubmit = (event: Event) => {
  event.preventDefault();
  if (inputValue.value.trim() === '') {
    return;
  }

  emit('addTodo', {
    id: nanoid(),
    text: inputValue.value,
    isDone: false,
    isLike: false,
    date: props.createAt.getTime(),
  });

  generateHapticFeedback({ type: 'softMedium' });
  inputValue.value = '';
};

watch(
  () => props.createAt,
  () => {
    inputValue.value = '';
  }
);
</script>

<template>
  <form class="bottom-reply" @submit="handleSubmit">
    <input
      class="input"
      type="text"
      v-model="inputValue"
      :disabled="isDisabled"
    />
    <button class="button" type="submit" :disabled="isDisabled">
      <i class="ri-add-line"></i>
    </button>
  </form>
</template>

<style scoped>
.bottom-reply {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(var(--bottom-reply-height) + var(--bottom-padding, 0px));
  padding-inline: 20px;
  padding-bottom: var(--bottom-padding, 0);
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-gray-700);
  z-index: 900;
}

.input {
  flex: 1;
  height: 48px;
  border: initial;
  outline: initial;
  padding: 12px;
  border-radius: var(--rounded-sm);
  background-color: var(--color-gray-100);
  font-size: 16px;
  font-weight: 400;
  transition: 200ms ease-in-out;
}

input:active {
  transform: scale3D(0.99, 0.975, 1);
}

.input:disabled {
  background-color: var(--color-gray-500);
}

.button {
  width: 48px;
  height: 48px;
  border: initial;
  outline: initial;
  border-radius: var(--rounded-sm);
  background-color: var(--color-blue-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--icon-size-md);
  color: var(--color-gray-100);
  transition: 200ms ease-in-out;
}

.button:active {
  background-color: var(--color-blue-500);
  transform: scale(0.975);
}

.button:disabled {
  background-color: var(--color-blue-700);
  color: var(--color-gray-400);
}
</style>
