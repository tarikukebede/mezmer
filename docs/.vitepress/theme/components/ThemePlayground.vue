<template>
  <div class="theme-playground-host">
    <div ref="mountNode"></div>
  </div>
</template>

<script setup lang="ts">
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ThemePlayground } from './ThemePlayground.react';

const mountNode = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

onMounted(() => {
  if (!mountNode.value) {
    return;
  }

  root = createRoot(mountNode.value);
  root.render(React.createElement(ThemePlayground));
});

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>

<style scoped>
.theme-playground-host {
  margin-top: 1rem;
}
</style>
