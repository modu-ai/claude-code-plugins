<script setup lang="ts">
import { ref, computed } from 'vue';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

const emit = defineEmits<{
  (event: 'update:selectDate', date: string): void;
}>();

const current = Date.now();
const formattedToday = format(current, 'yyyy-MM-dd');
const selectDate = ref(formattedToday);

const start = startOfWeek(current, { weekStartsOn: 1 });
const end = endOfWeek(current, { weekStartsOn: 1 });
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const week = computed(() =>
  eachDayOfInterval({ start, end }).map((day, i) => ({
    date: format(day, 'yyyy-MM-dd'),
    label: WEEK_LABELS[i],
  }))
);

const handleSelectDate = (date: string) => {
  selectDate.value = date;
  emit('update:selectDate', date);
  generateHapticFeedback({ type: 'softMedium' });
};
</script>

<template>
  <div class="week-container">
    <h3 class="month">{{ format(current, 'MMMM') }}</h3>
    <ul class="week">
      <li
        v-for="{ date, label } in week"
        :key="date"
        :class="{
          date: true,
          'select-date': selectDate === date,
          today: formattedToday === date,
        }"
        @click="handleSelectDate(date)"
      >
        <p class="date-labels">{{ label }}</p>
        <p class="date-number">{{ date.slice(-2) }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.week-container {
  width: 100%;
  height: 30%;
  padding-block: 25px 20px;
  padding-inline: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-gray-800);
}

.month {
  font-size: 28px;
  font-weight: 800;
  line-height: 125%;
  color: var(--color-gray-100);
}

.week {
  width: 100%;
  flex: 1;
  display: flex;
  gap: 5px;
  align-items: center;
}

.date {
  width: calc(100% / 7);
  height: 100%;
  max-height: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: var(--rounded-md);
  background-color: var(--color-gray-700);
  transition: 200ms ease-in-out;
}

.date:active {
  transform: scale(0.975);
}

.today:not(.select-date) {
  background-color: var(--color-blue-700);
}

.select-date {
  background-color: var(--color-blue-400);
}

.date-labels {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-gray-300-alpha);
}

.date-number {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-gray-300);
}
</style>
