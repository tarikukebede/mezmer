import { ReactNode } from 'react';

export interface DetailsCardBodyProps {
  tabs: DetailsCardBodyTab[];
  isLoading: boolean;
}

export interface DetailsCardBodyTab {
  key: string;
  label: string;
  component: ReactNode;
}
