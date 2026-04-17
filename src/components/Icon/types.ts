import type { LucideIcon, LucideProps } from 'lucide-react';

export type IconSource = LucideIcon | { default: LucideIcon };

export interface IconProps extends LucideProps {
  icon: IconSource;
}
