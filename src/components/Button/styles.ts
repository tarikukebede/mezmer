import type { ButtonPrimitiveVariant } from '@ui/button';

export enum ButtonVariant {
  Primary = 'primary',
  Default = 'default',
  Dashed = 'dashed',
  Outlined = 'outlined',
  Text = 'text',
  Destructive = 'destructive',
}

export const BUTTON_VARIANT_CLASS_NAMES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]:
    'bg-gradient-to-b from-primary to-primary/90 text-primary-foreground',
  [ButtonVariant.Default]:
    'border border-border bg-card text-card-foreground hover:bg-muted',
  [ButtonVariant.Dashed]: 'border-dashed bg-background text-foreground',
  [ButtonVariant.Outlined]: 'bg-background text-foreground',
  [ButtonVariant.Text]:
    'h-auto rounded-none px-0 py-0 shadow-none hover:shadow-none',
  [ButtonVariant.Destructive]: '',
};

export const BUTTON_VARIANT_MAPPING: Record<
  ButtonVariant,
  ButtonPrimitiveVariant
> = {
  [ButtonVariant.Primary]: 'default',
  [ButtonVariant.Default]: 'secondary',
  [ButtonVariant.Dashed]: 'outline',
  [ButtonVariant.Outlined]: 'outline',
  [ButtonVariant.Text]: 'link',
  [ButtonVariant.Destructive]: 'destructive',
};
