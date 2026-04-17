import { DetailsCardBodyProps } from './types';
import { memo, useEffect, useMemo, useState } from 'react';
import { cn } from '@lib/utils';

export const DetailsCardBody = (props: DetailsCardBodyProps) => {
  const { tabs, isLoading } = props;
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(
    tabs[0]?.key,
  );
  const defaultTab = tabs[0]?.key;

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === activeTabKey)) {
      setActiveTabKey(defaultTab);
    }
  }, [activeTabKey, defaultTab, tabs]);

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.key === activeTabKey) ?? tabs[0],
    [activeTabKey, tabs],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[180px] items-center justify-center">
        <div
          role="status"
          aria-live="polite"
          className="text-xs text-muted-foreground"
        >
          Loading details...
        </div>
      </div>
    );
  }

  if (tabs.length === 0 || !activeTab) {
    return null;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        role="tablist"
        aria-label="Details sections"
        className="flex w-full items-center gap-2 overflow-x-auto border-b px-4 py-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab.key;

          return (
            <button
              key={tab.key}
              id={`details-card-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`details-card-panel-${tab.key}`}
              onClick={() => setActiveTabKey(tab.key)}
              className={cn(
                'rounded-sm border-b-2 px-3 py-1 text-sm transition-colors',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`details-card-panel-${activeTab.key}`}
        role="tabpanel"
        aria-labelledby={`details-card-tab-${activeTab.key}`}
        className="flex-1 overflow-auto p-4"
      >
        {activeTab.component}
      </div>
    </div>
  );
};

export default memo(DetailsCardBody);
