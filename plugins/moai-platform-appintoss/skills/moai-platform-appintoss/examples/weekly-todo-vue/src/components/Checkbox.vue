<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  initialValue?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: false,
});

const emit = defineEmits<{
  (event: 'update:checked', checked: boolean): void;
}>();

const checked = ref(props.initialValue);

const handleChange = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  checked.value = isChecked;
  emit('update:checked', isChecked);
};
</script>

<template>
  <label class="checkbox">
    <input
      type="checkbox"
      v-model="checked"
      @change="handleChange"
      hidden
      :disabled="props.disabled"
    />
    <slot></slot>
  </label>
</template>

<style scoped>
.checkbox {
  position: relative;
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--icon-size-md);
  color: var(--color-gray-400);
}
</style>
