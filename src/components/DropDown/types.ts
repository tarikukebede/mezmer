import type { ReactNode } from 'react';

export type DropDownAccessMode = 'view' | 'edit';

export type DropDownAccessResolver = (
  requirement: string,
  mode: DropDownAccessMode,
) => boolean;

export interface DropDownProps {
  label?: string;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  options: DropDownOption[];
  placeholder?: string;
  renderOption?: (option: DropDownOption) => ReactNode;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  onOpenChange?: (open: boolean) => void;
  accessRequirements?: string[];
  resolveAccess?: DropDownAccessResolver;
}

export interface DropDownOption {
  label: string;
  value: string;
}
