import type { LucideIcon } from 'lucide-react';
import type { CustomButton } from '@components/DetailsCard/types';

export interface DetailsCardHeaderProps<T> {
  title: string;
  icon: LucideIcon;
  data?: T | null;
  onClose?: () => void;
  onSave?: (data: T | null) => void;
  onDelete?: (data: T | null) => void;
  saveAccessRequirements?: string[];
  deleteAccessRequirements?: string[];
  customButtons?: CustomButton<T>[];
}
