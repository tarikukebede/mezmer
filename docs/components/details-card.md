# DetailsCard

## Purpose

Reusable details surface with a persistent header action area, optional custom content, and tabbed body sections.

## Import

```tsx
import { DetailsCard } from '@tarikukebede/mezmer';
```

## Required Props

- `title: string`
- `icon: LucideIcon`
- `isLoading: boolean`

## Common Optional Props

- `data?: T`
- `tabs?: DetailsCardBodyTab[]`
- `renderCustomContent?: () => ReactNode`
- `onSave?: (data: T | null) => void`
- `onDelete?: (data: T | null) => void`
- `onClose?: () => void`
- `saveAccessRequirements?: string[]`
- `deleteAccessRequirements?: string[]`
- `customButtons?: CustomButton<T>[]`

`CustomButton<T>` supports:

- `label: string`
- `onClick: (data: T | null) => void`
- `icon?: LucideIcon`
- `variant?: ButtonVariant`
- `loading?: boolean`
- `disabled?: boolean`
- `accessRequirements?: string[]`

## Accessibility

- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"` for section navigation.
- Marks loading content with `role="status"` and `aria-live="polite"`.

## Access Behavior

- Header actions are delegated to `Button`, so access behavior matches the shared action-control contract.
- Save and delete actions can receive dedicated access requirement lists.
- Custom actions may provide `accessRequirements` for per-action gating.

## Example

```tsx
import { FileText, Archive } from 'lucide-react';
import { ButtonVariant, DetailsCard } from '@tarikukebede/mezmer';

interface UserDetails {
  id: string;
  email: string;
}

<DetailsCard<UserDetails>
  title="User Details"
  icon={FileText}
  isLoading={false}
  data={{ id: '42', email: 'owner@company.com' }}
  tabs={[
    { key: 'profile', label: 'Profile', component: <div>Profile content</div> },
    {
      key: 'security',
      label: 'Security',
      component: <div>Security content</div>,
    },
  ]}
  onSave={(data) => console.log('save', data)}
  onDelete={(data) => console.log('delete', data)}
  onClose={() => console.log('close')}
  customButtons={[
    {
      label: 'Archive',
      icon: Archive,
      variant: ButtonVariant.Outlined,
      onClick: (data) => console.log('archive', data),
      accessRequirements: ['users.archive'],
    },
  ]}
/>;
```
