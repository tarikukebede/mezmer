import { useEffect, useMemo, useState } from 'react';
import { Button, Chip, DatePicker, Input, Search } from '../../../../src';
import type { DatePickerChange } from '../../../../src/components/DatePicker/types';

type ThemeId = 'default' | 'slate';
type Mode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'mezmer-docs-theme';
const MODE_STORAGE_KEY = 'mezmer-docs-mode';
const THEME_STYLESHEET_ID = 'mezmer-docs-theme-stylesheet';

function getThemeStylesheetHref(theme: ThemeId): string {
  const basePath = import.meta.env.BASE_URL || '/';
  return `${basePath}themes/${theme}.css`;
}

function ensureThemeStylesheet(theme: ThemeId): void {
  const href = getThemeStylesheetHref(theme);
  let link = document.getElementById(
    THEME_STYLESHEET_ID,
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.id = THEME_STYLESHEET_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}

function resolveInitialTheme(): ThemeId {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'default' || stored === 'slate') {
    return stored;
  }

  return 'default';
}

function resolveInitialMode(): Mode {
  const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return 'light';
}

export function ThemePlayground() {
  const [theme, setTheme] = useState<ThemeId>('default');
  const [mode, setMode] = useState<Mode>('light');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setTheme(resolveInitialTheme());
    setMode(resolveInitialMode());
  }, []);

  useEffect(() => {
    ensureThemeStylesheet(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  const activeThemeLabel = useMemo(() => `${theme} / ${mode}`, [mode, theme]);

  const handleDateChange = (change: DatePickerChange) => {
    setSelectedDate(change.target.value);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          label="Default"
          variant={theme === 'default' ? 'default' : 'outline'}
          onClick={() => setTheme('default')}
        />
        <Button
          type="button"
          label="Slate"
          variant={theme === 'slate' ? 'default' : 'outline'}
          onClick={() => setTheme('slate')}
        />
        <Button
          type="button"
          label={mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          variant="secondary"
          onClick={() =>
            setMode((current) => (current === 'dark' ? 'light' : 'dark'))
          }
        />
        <Chip label={`Theme: ${activeThemeLabel}`} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border bg-background p-4">
          <h3 className="text-sm font-semibold">Core Components</h3>
          <Input
            name="email"
            label="Email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <DatePicker
            name="startDate"
            label="Start date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <Search
            placeholder="Search components"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-background p-4">
          <h3 className="text-sm font-semibold">Building Block Example</h3>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium">Team Access Review</p>
            <p className="mb-3 text-sm text-muted-foreground">
              This card uses the same semantic tokens as primitive components.
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              <Chip label="Design" />
              <Chip label="Platform" />
              <Chip label="In Review" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" label="Approve" />
              <Button type="button" label="Request changes" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
