<template>
  <div class="component-example-tabs-host">
    <div ref="mountNode"></div>
  </div>
</template>

<script setup lang="ts">
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  ComponentExampleTabs,
  type ComponentExampleId,
} from './ComponentExampleTabs.react';

const props = defineProps<{
  component: ComponentExampleId;
}>();

const mountNode = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

function renderTabs() {
  if (!root) {
    return;
  }

  root.render(
    React.createElement(ComponentExampleTabs, {
      component: props.component,
    }),
  );
}

onMounted(() => {
  if (!mountNode.value) {
    return;
  }

  root = createRoot(mountNode.value);
  renderTabs();
});

watch(
  () => props.component,
  () => {
    renderTabs();
  },
);

onBeforeUnmount(() => {
  root?.unmount();
  root = null;
});
</script>

<style scoped>
.component-example-tabs-host {
  margin-top: 1rem;
}

.component-example-tabs {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.component-example-tabs__controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 85%, var(--vp-c-bg));
}

.component-example-tabs__button {
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.component-example-tabs__button:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.component-example-tabs__button.is-active {
  color: var(--vp-c-text-1);
  border-color: color-mix(
    in srgb,
    var(--vp-c-brand-1) 30%,
    var(--vp-c-divider)
  );
  background: color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent);
}

.component-example-tabs__panel {
  padding: 1rem;
  background: var(--vp-c-bg);
}

.component-example-tabs__preview {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}

.component-example-tabs__code {
  margin: 0;
  max-height: 460px;
  overflow: auto;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  padding: 0.9rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--vp-c-text-1);
}

.component-example-tabs__preview > :deep(*) {
  max-width: 100%;
}
</style>
