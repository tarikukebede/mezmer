import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import ThemePlayground from './components/ThemePlayground.vue';

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component('ThemePlayground', ThemePlayground);
  },
};

export default theme;
