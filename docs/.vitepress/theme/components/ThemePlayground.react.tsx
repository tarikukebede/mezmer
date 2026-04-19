import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
  DropDown,
  Icon,
  Image,
  Input,
  Search,
} from '../../../../src';
import { Bell } from 'lucide-react';
import './ThemePlayground.css';

type BuiltInThemeId =
  | 'corporate'
  | 'default'
  | 'forest'
  | 'midnight'
  | 'ocean'
  | 'sand'
  | 'slate'
  | 'sunset';

type Mode = 'light' | 'dark';

type ThemeOption = {
  id: BuiltInThemeId;
  label: string;
  note: string;
  light: {
    primary: string;
    accent: string;
    surface: string;
  };
  dark: {
    primary: string;
    accent: string;
    surface: string;
  };
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    label: 'Default',
    note: 'shadcn baseline',
    light: {
      primary: 'hsl(221.2 83.2% 53.3%)',
      accent: 'hsl(210 40% 96.1%)',
      surface: 'hsl(0 0% 100%)',
    },
    dark: {
      primary: 'hsl(217.2 91.2% 59.8%)',
      accent: 'hsl(217.2 32.6% 17.5%)',
      surface: 'hsl(222.2 84% 4.9%)',
    },
  },
  {
    id: 'corporate',
    label: 'Corporate',
    note: 'enterprise tone',
    light: {
      primary: 'hsl(221 65% 35%)',
      accent: 'hsl(199 72% 45%)',
      surface: 'hsl(210 33% 98%)',
    },
    dark: {
      primary: 'hsl(210 92% 73%)',
      accent: 'hsl(198 70% 52%)',
      surface: 'hsl(222 39% 11%)',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    note: 'organic contrast',
    light: {
      primary: 'hsl(142 58% 33%)',
      accent: 'hsl(88 45% 48%)',
      surface: 'hsl(114 38% 97%)',
    },
    dark: {
      primary: 'hsl(141 50% 58%)',
      accent: 'hsl(88 38% 45%)',
      surface: 'hsl(128 30% 9%)',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    note: 'high contrast cool',
    light: {
      primary: 'hsl(245 75% 58%)',
      accent: 'hsl(278 68% 58%)',
      surface: 'hsl(228 34% 96%)',
    },
    dark: {
      primary: 'hsl(246 86% 70%)',
      accent: 'hsl(278 67% 63%)',
      surface: 'hsl(232 35% 8%)',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    note: 'clean and vibrant',
    light: {
      primary: 'hsl(200 88% 42%)',
      accent: 'hsl(174 54% 47%)',
      surface: 'hsl(196 55% 97%)',
    },
    dark: {
      primary: 'hsl(197 88% 60%)',
      accent: 'hsl(173 48% 39%)',
      surface: 'hsl(208 53% 9%)',
    },
  },
  {
    id: 'sand',
    label: 'Sand',
    note: 'warm palette',
    light: {
      primary: 'hsl(28 74% 46%)',
      accent: 'hsl(16 66% 56%)',
      surface: 'hsl(42 56% 97%)',
    },
    dark: {
      primary: 'hsl(30 82% 63%)',
      accent: 'hsl(16 66% 58%)',
      surface: 'hsl(30 25% 10%)',
    },
  },
  {
    id: 'slate',
    label: 'Slate',
    note: 'neutral utility',
    light: {
      primary: 'hsl(215 27.9% 16.9%)',
      accent: 'hsl(214 32% 91%)',
      surface: 'hsl(210 40% 98%)',
    },
    dark: {
      primary: 'hsl(210 40% 98%)',
      accent: 'hsl(217.2 32.6% 20%)',
      surface: 'hsl(222.2 47.4% 8.5%)',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    note: 'expressive blend',
    light: {
      primary: 'hsl(17 84% 54%)',
      accent: 'hsl(335 74% 58%)',
      surface: 'hsl(28 70% 97%)',
    },
    dark: {
      primary: 'hsl(20 90% 63%)',
      accent: 'hsl(336 64% 60%)',
      surface: 'hsl(14 30% 10%)',
    },
  },
];

const THEME_STORAGE_KEY = 'mezmer-docs-theme';
const MODE_STORAGE_KEY = 'mezmer-docs-mode';
const THEME_STYLESHEET_ID = 'mezmer-docs-theme-stylesheet';
const LEGACY_PREVIEW_THEME_STYLESHEET_ID =
  'mezmer-docs-component-preview-theme';

function getThemeStylesheetHref(theme: BuiltInThemeId): string {
  const basePath =
    (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env
      ?.BASE_URL || '/';
  return `${basePath}themes/${theme}.css`;
}

function ensureThemeStylesheet(theme: BuiltInThemeId): void {
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

function resolveInitialTheme(): BuiltInThemeId {
  const stored = globalThis.localStorage.getItem(THEME_STORAGE_KEY);
  const resolved = THEME_OPTIONS.find((option) => option.id === stored);

  if (resolved) {
    return resolved.id;
  }

  return 'default';
}

function resolveInitialMode(): Mode {
  const stored = globalThis.localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return 'light';
}

const TOKEN_SWATCHES: Array<{ label: string; token: string }> = [
  { label: 'Background', token: '--mz-background' },
  { label: 'Foreground', token: '--mz-foreground' },
  { label: 'Primary', token: '--mz-primary' },
  { label: 'Secondary', token: '--mz-secondary' },
  { label: 'Muted', token: '--mz-muted' },
  { label: 'Accent', token: '--mz-accent' },
  { label: 'Destructive', token: '--mz-destructive' },
  { label: 'Border', token: '--mz-border' },
];

type PreviewCardProps = Readonly<{
  mode: Mode;
  email: string;
  searchValue: string;
  startDate: string;
  selectedCountry: string;
  acceptedTerms: boolean;
  onEmailChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onSelectedCountryChange: (value: string) => void;
  onAcceptedTermsChange: (value: boolean) => void;
}>;

function PreviewCard(props: PreviewCardProps) {
  const {
    mode,
    email,
    searchValue,
    startDate,
    selectedCountry,
    acceptedTerms,
    onEmailChange,
    onSearchChange,
    onStartDateChange,
    onSelectedCountryChange,
    onAcceptedTermsChange,
  } = props;

  const title = mode === 'light' ? 'Light Surface' : 'Dark Surface';

  return (
    <article className={`mz-preview-card${mode === 'dark' ? ' dark' : ''}`}>
      <div className="mz-preview-card__surface">
        <div className="mz-preview-card__head">
          <div>
            <h4 className="mz-preview-card__title">{title}</h4>
          </div>
        </div>

        <div className="mz-preview-card__stack">
          <section className="mz-preview-card__section">
            <div className="mz-preview-card__section-head">
              <h5 className="mz-preview-card__section-title">Inputs</h5>
            </div>
            <div className="mz-preview-card__component-grid">
              <div className="mz-preview-card__component-item">
                <Input
                  name={`theme-preview-email-${mode}`}
                  label="Email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => onEmailChange(event.target.value)}
                />
              </div>

              <div className="mz-preview-card__component-item">
                <Search
                  placeholder="Search components"
                  value={searchValue}
                  onChange={onSearchChange}
                />
              </div>

              <div className="mz-preview-card__component-item">
                <DatePicker
                  name={`theme-preview-date-${mode}`}
                  label="Start Date"
                  value={startDate}
                  onChange={(change) =>
                    onStartDateChange(change.target.value ?? '')
                  }
                />
              </div>

              <div className="mz-preview-card__component-item">
                <DropDown
                  label="Country"
                  value={selectedCountry}
                  placeholder="Select country"
                  options={[
                    { label: 'United States', value: 'US' },
                    { label: 'Canada', value: 'CA' },
                    { label: 'Germany', value: 'DE' },
                  ]}
                  onChange={onSelectedCountryChange}
                />
              </div>
            </div>
          </section>

          <section className="mz-preview-card__section">
            <div className="mz-preview-card__section-head">
              <h5 className="mz-preview-card__section-title">Actions</h5>
            </div>

            <div className="mz-preview-card__component-row">
              <Checkbox
                name={`theme-preview-terms-${mode}`}
                label="Terms"
                title="I agree to the terms"
                checked={acceptedTerms}
                onCheckChange={onAcceptedTermsChange}
              />
            </div>

            <div className="mz-preview-card__actions">
              <Button label="Primary" />
              <Button label="Secondary" variant="outline" />
              <Button label="Ghost" variant="ghost" />
            </div>

            <div className="mz-preview-card__chips">
              <Chip label="UI" />
              <Chip label="Theme" />
              <Chip label="Preview" />
              <Icon
                icon={Bell}
                className="h-4 w-4 text-muted-foreground"
                aria-label="Alerts"
              />
              <Image src="/tech-icons/shadcnui.svg" alt="Tech logo" size="sm" />
            </div>
          </section>

          <section className="mz-preview-card__section">
            <div className="mz-preview-card__section-head">
              <h5 className="mz-preview-card__section-title">Tokens</h5>
            </div>

            <div
              className="mz-preview-card__token-grid"
              aria-label="Token swatches"
            >
              {TOKEN_SWATCHES.map((swatch) => (
                <span key={`${mode}-${swatch.token}`} className="mz-token-item">
                  <span
                    className="mz-token-item__dot"
                    style={{ backgroundColor: `hsl(var(${swatch.token}))` }}
                    aria-hidden="true"
                  />
                  <span className="mz-token-item__label">{swatch.label}</span>
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

export function ThemePlayground() {
  const [theme, setTheme] = useState<BuiltInThemeId>('default');
  const [mode, setMode] = useState<Mode>('light');
  const [email, setEmail] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('2026-04-19');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const setThemeByIndex = (index: number) => {
    const normalizedIndex =
      (index + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    setTheme(THEME_OPTIONS[normalizedIndex].id);
  };

  const handleThemeOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setThemeByIndex(index + 1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setThemeByIndex(index - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setThemeByIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setThemeByIndex(THEME_OPTIONS.length - 1);
    }
  };

  useEffect(() => {
    setTheme(resolveInitialTheme());
    setMode(resolveInitialMode());

    const legacyPreviewStylesheet = document.getElementById(
      LEGACY_PREVIEW_THEME_STYLESHEET_ID,
    );

    if (legacyPreviewStylesheet) {
      legacyPreviewStylesheet.remove();
    }
  }, []);

  useEffect(() => {
    ensureThemeStylesheet(theme);
    globalThis.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    globalThis.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  return (
    <section className="mz-theme-playground" aria-label="Theme playground">
      <header className="mz-theme-playground__header">
        <fieldset className="mz-theme-playground__mode-toggle-group">
          <legend className="mz-theme-playground__sr-only">Preview mode</legend>
          <button
            type="button"
            className={mode === 'light' ? 'is-active' : undefined}
            onClick={() => setMode('light')}
            aria-pressed={mode === 'light'}
          >
            Light
          </button>
          <button
            type="button"
            className={mode === 'dark' ? 'is-active' : undefined}
            onClick={() => setMode('dark')}
            aria-pressed={mode === 'dark'}
          >
            Dark
          </button>
        </fieldset>
      </header>

      <div
        className="mz-theme-playground__theme-grid"
        role="radiogroup"
        aria-label="Available themes"
      >
        {THEME_OPTIONS.map((option, index) => {
          const isActive = option.id === theme;
          const palette = option.light;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setTheme(option.id)}
              onKeyDown={(event) => handleThemeOptionKeyDown(event, index)}
              className={`mz-theme-option${isActive ? ' is-active' : ''}`}
            >
              <span className="mz-theme-option__head">
                <span className="mz-theme-option__label">{option.label}</span>
              </span>

              <span className="mz-theme-option__swatches" aria-hidden="true">
                <span
                  className="mz-theme-option__dot"
                  style={{ backgroundColor: palette.primary }}
                />
                <span
                  className="mz-theme-option__dot"
                  style={{ backgroundColor: palette.accent }}
                />
                <span
                  className="mz-theme-option__dot"
                  style={{ backgroundColor: palette.surface }}
                />
              </span>

              <span className="mz-theme-option__note">{option.note}</span>
            </button>
          );
        })}
      </div>

      <div className="mz-theme-playground__preview-grid">
        <PreviewCard
          mode={mode}
          email={email}
          searchValue={searchValue}
          startDate={startDate}
          selectedCountry={selectedCountry}
          acceptedTerms={acceptedTerms}
          onEmailChange={setEmail}
          onSearchChange={setSearchValue}
          onStartDateChange={setStartDate}
          onSelectedCountryChange={setSelectedCountry}
          onAcceptedTermsChange={setAcceptedTerms}
        />
      </div>
    </section>
  );
}
