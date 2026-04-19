import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import ThemePlayground from './components/ThemePlayground.vue';
import ComponentExampleTabs from './components/ComponentExampleTabs.vue';
import './custom.css';

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component('ThemePlayground', ThemePlayground);
    ctx.app.component('ComponentExampleTabs', ComponentExampleTabs);
  },
};

export default theme;
