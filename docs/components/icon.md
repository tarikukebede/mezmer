# Icon

## Purpose

Thin, typed wrapper around Lucide icons with prop forwarding.

## Import

```tsx
import { Icon } from '@tarikukebede/mezmer';
```

## Required Props

- `icon: LucideIcon | { default: LucideIcon }`

## Common Optional Props

- `className?: string`
- Standard SVG icon props, for example `size`, `strokeWidth`, and `aria-*`

## Accessibility

- Consumer-provided ARIA props are forwarded to the rendered icon.

## Example

<ComponentExampleTabs component="icon" />
