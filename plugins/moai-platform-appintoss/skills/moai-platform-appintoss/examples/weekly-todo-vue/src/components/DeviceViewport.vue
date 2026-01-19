<script setup lang="ts">
import { onMounted } from 'vue';
import { getPlatformOS } from '@apps-in-toss/web-framework';

const isIOS = getPlatformOS() === 'ios';

onMounted(() => {
  const styles = {
    '--min-height': `${window.innerHeight}px`,
  };

  if (isIOS) {
    Object.assign(styles, {
      '--bottom-padding': `max(env(safe-area-inset-bottom), 20px)`,
      '--top-padding': `max(env(safe-area-inset-top), 20px)`,
    });
  }

  for (const [key, value] of Object.entries(styles)) {
    document.documentElement.style.setProperty(key, value);
  }
});
</script>

<template />
