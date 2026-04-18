# Theme Playground

Use this page to preview how Mezmer components and composed building blocks react to theme changes in real time.

## Live Preview

<ThemePlayground />

## What This Demonstrates

- Theme stylesheet switching (`default` and `slate`) at runtime
- Light and dark mode toggling with the `.dark` class
- Primitive component updates (`Button`, `Input`, `DatePicker`, `Search`, `Chip`)
- A composed card-style building block that inherits the same semantic tokens

## Implementation Notes

- The playground is mounted through a VitePress custom theme component.
- Theme stylesheets are loaded from `docs/public/themes`.
- Selection persists in `localStorage` for quick iteration while documenting.
