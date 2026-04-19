import { useMemo, useState, type JSX } from 'react';
import {
  Autocomplete,
  BaseModal,
  BaseTable,
  Button,
  ButtonVariant,
  Checkbox,
  Chip,
  DatePicker,
  DetailsCard,
  DropDown,
  Icon,
  Image,
  Input,
  Page,
  Search,
} from '../../../../src';
import { CellType } from '../../../../src/components/BaseTable/components/BaseTableRow/components/BaseTableCell';
import { Archive, Bell, Circle, Download, FileText, Plus } from 'lucide-react';

export type ComponentExampleId =
  | 'autocomplete'
  | 'base-modal'
  | 'base-table'
  | 'button'
  | 'checkbox'
  | 'chip'
  | 'date-picker'
  | 'details-card'
  | 'drop-down'
  | 'icon'
  | 'image'
  | 'input'
  | 'page'
  | 'search';

type ExampleConfig = {
  code: string;
  render: () => JSX.Element;
};

type TokenKind = 'keyword' | 'string' | 'comment' | 'number' | 'plain';

type Token = {
  value: string;
  kind: TokenKind;
};

const TSX_KEYWORDS = new Set([
  'import',
  'from',
  'type',
  'interface',
  'const',
  'let',
  'var',
  'return',
  'async',
  'await',
  'if',
  'else',
  'for',
  'while',
  'switch',
  'case',
  'default',
  'break',
  'continue',
  'new',
  'null',
  'true',
  'false',
  'undefined',
  'extends',
  'implements',
  'function',
  'class',
  'export',
  'try',
  'catch',
  'finally',
  'typeof',
  'in',
  'of',
  'as',
]);

function highlightTsxLine(line: string): Token[] {
  const tokenMatcher =
    /(\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g;

  const tokens: Token[] = [];
  let cursor = 0;
  let match = tokenMatcher.exec(line);

  while (match) {
    const matched = match[0];
    const start = match.index;

    if (start > cursor) {
      tokens.push({
        value: line.slice(cursor, start),
        kind: 'plain',
      });
    }

    if (matched.startsWith('//')) {
      tokens.push({ value: matched, kind: 'comment' });
    } else if (
      matched.startsWith('"') ||
      matched.startsWith("'") ||
      matched.startsWith('`')
    ) {
      tokens.push({ value: matched, kind: 'string' });
    } else if (/^\d/.test(matched)) {
      tokens.push({ value: matched, kind: 'number' });
    } else if (TSX_KEYWORDS.has(matched)) {
      tokens.push({ value: matched, kind: 'keyword' });
    } else {
      tokens.push({ value: matched, kind: 'plain' });
    }

    cursor = start + matched.length;
    match = tokenMatcher.exec(line);
  }

  if (cursor < line.length) {
    tokens.push({
      value: line.slice(cursor),
      kind: 'plain',
    });
  }

  return tokens;
}

type UserOption = {
  id: number;
  name: string;
  email: string;
};

const MOCK_USERS: UserOption[] = [
  { id: 1, name: 'Alex Rivera', email: 'alex@company.com' },
  { id: 2, name: 'Jordan Kim', email: 'jordan@company.com' },
  { id: 3, name: 'Sam Lee', email: 'sam@company.com' },
  { id: 4, name: 'Taylor Morgan', email: 'taylor@company.com' },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function AutocompletePreview(): JSX.Element {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 480 }}>
      <Autocomplete<UserOption>
        name="assignee"
        label="Assignee"
        value={selectedId}
        size={4}
        searchOptions={async ({ query, page, size }) => {
          await wait(120);
          const filtered = MOCK_USERS.filter((item) => {
            const needle = query.toLowerCase().trim();
            if (!needle) {
              return true;
            }

            return (
              item.name.toLowerCase().includes(needle) ||
              item.email.toLowerCase().includes(needle)
            );
          });

          const start = (page - 1) * size;
          const items = filtered.slice(start, start + size);

          return {
            items,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(filtered.length / size)),
            totalItems: filtered.length,
          };
        }}
        getOptionById={async (id) => {
          await wait(50);
          return MOCK_USERS.find((user) => user.id === id) ?? null;
        }}
        onSelectOption={(item) => setSelectedId(item?.id ?? null)}
        renderOption={(item) => (
          <div>
            <div>{item.name}</div>
            <div className="text-xs text-muted-foreground">{item.email}</div>
          </div>
        )}
      />
    </div>
  );
}

function BaseModalPreview(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        label="Open Modal"
        variant={ButtonVariant.Outlined}
        onClick={() => setIsOpen(true)}
      />

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        description="Update profile settings"
        onSave={() => setIsOpen(false)}
        customButtons={[
          {
            label: 'Preview',
            onClick: () => undefined,
            variant: ButtonVariant.Outlined,
          },
        ]}
      >
        <div className="text-sm text-foreground">Modal content goes here</div>
      </BaseModal>
    </div>
  );
}

function BaseTablePreview(): JSX.Element {
  type Row = { id: number; name: string; status: string };

  const rows: Row[] = [
    { id: 1, name: 'Payment Service', status: 'active' },
    { id: 2, name: 'Audit Service', status: 'inactive' },
  ];

  return (
    <BaseTable<Row>
      data={rows}
      columns={[
        {
          id: 'name',
          header: 'Name',
          accessorKey: 'name',
          type: CellType.TEXT,
        },
        {
          id: 'status',
          header: 'Status',
          accessorKey: 'status',
          type: CellType.STATUS,
          sortable: true,
        },
      ]}
      onSortChange={() => undefined}
    />
  );
}

function ButtonPreview(): JSX.Element {
  return (
    <Button
      label="Export"
      leftIcon={Download}
      rightIcon={Download}
      variant={ButtonVariant.Outlined}
      onClick={() => undefined}
    />
  );
}

function CheckboxPreview(): JSX.Element {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      name="acceptTerms"
      label="Terms"
      title="I agree to the terms"
      checked={checked}
      onCheckChange={(next) => setChecked(next)}
    />
  );
}

function ChipPreview(): JSX.Element {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button
        label="Reset Chip"
        variant={ButtonVariant.Outlined}
        onClick={() => setVisible(true)}
      />
    );
  }

  return (
    <Chip
      label="Synced"
      icon={Circle}
      variant="secondary"
      size="md"
      onRemove={() => setVisible(false)}
    />
  );
}

function DatePickerPreview(): JSX.Element {
  const [value, setValue] = useState('2026-04-18');

  return (
    <div style={{ maxWidth: 320 }}>
      <DatePicker
        name="startDate"
        label="Start Date"
        value={value}
        helperText="Choose a start date"
        onChange={(change) => {
          setValue(change.target.value ?? '');
        }}
      />
    </div>
  );
}

function DetailsCardPreview(): JSX.Element {
  type UserDetails = {
    id: string;
    email: string;
  };

  return (
    <DetailsCard<UserDetails>
      title="User Details"
      icon={FileText}
      isLoading={false}
      data={{ id: '42', email: 'owner@company.com' }}
      tabs={[
        {
          key: 'profile',
          label: 'Profile',
          component: <div>Profile content</div>,
        },
        {
          key: 'security',
          label: 'Security',
          component: <div>Security content</div>,
        },
      ]}
      onSave={() => undefined}
      onDelete={() => undefined}
      onClose={() => undefined}
      customButtons={[
        {
          label: 'Archive',
          icon: Archive,
          variant: ButtonVariant.Outlined,
          onClick: () => undefined,
        },
      ]}
    />
  );
}

function DropDownPreview(): JSX.Element {
  const [country, setCountry] = useState('');

  return (
    <div style={{ maxWidth: 320 }}>
      <DropDown
        label="Country"
        value={country}
        placeholder="Select country"
        options={[
          { label: 'United States', value: 'US' },
          { label: 'Canada', value: 'CA' },
        ]}
        onChange={(next) => setCountry(next)}
      />
    </div>
  );
}

function IconPreview(): JSX.Element {
  return (
    <Icon
      icon={Bell}
      className="h-4 w-4 text-muted-foreground"
      aria-label="Alerts"
    />
  );
}

function ImagePreview(): JSX.Element {
  return <Image src="/tech-icons/shadcnui.svg" alt="Tech logo" size="md" />;
}

function InputPreview(): JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <div style={{ maxWidth: 360 }}>
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@company.com"
      />
    </div>
  );
}

function PagePreview(): JSX.Element {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-4">
      <Page
        searchPlaceholder="Search users"
        onSearch={(value) => setQuery(value)}
        actions={[
          {
            name: 'Create User',
            onClick: () => undefined,
            icon: Plus,
            variant: ButtonVariant.Default,
          },
        ]}
        filterSlot={
          <div className="text-xs text-muted-foreground">Active only</div>
        }
      >
        <div className="rounded-md border p-4">Page content</div>
      </Page>

      <div className="text-xs text-muted-foreground">
        Latest query: {query || '-'}
      </div>
    </div>
  );
}

function SearchPreview(): JSX.Element {
  const [value, setValue] = useState('');

  return (
    <div style={{ maxWidth: 320 }}>
      <Search placeholder="Search users" value={value} onChange={setValue} />
    </div>
  );
}

const EXAMPLES: Record<ComponentExampleId, ExampleConfig> = {
  autocomplete: {
    render: AutocompletePreview,
    code: `import { Autocomplete } from '@tarikukebede/mezmer';

type User = {
  id: number;
  name: string;
  email: string;
};

<Autocomplete<User>
  name="assignee"
  label="Assignee"
  value={null}
  searchOptions={async ({ query, page, size }) => {
    const response = await fetch(
      \`/api/users?query=\${encodeURIComponent(query)}&page=\${page}&size=\${size}\`,
    );
    const data = await response.json();
    return {
      items: data.items,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalItems: data.totalItems,
    };
  }}
  onSelectOption={(item) => console.log(item)}
  renderOption={(item) => (
    <div>
      <div>{item.name}</div>
      <div className="text-xs text-muted-foreground">{item.email}</div>
    </div>
  )}
/>;`,
  },
  'base-modal': {
    render: BaseModalPreview,
    code: `import { BaseModal, ButtonVariant } from '@tarikukebede/mezmer';

<BaseModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  description="Update profile settings"
  onSave={() => console.log('save')}
  saveAccessRequirements={['profile.update']}
  resolveAccess={(requirement, mode) => {
    if (mode === 'view') return requirement !== 'profile.hidden';
    return requirement === 'profile.update';
  }}
  customButtons={[
    {
      label: 'Preview',
      onClick: () => console.log('preview'),
      variant: ButtonVariant.Outlined,
      accessRequirements: ['profile.preview'],
    },
  ]}
>
  <div className="text-sm text-foreground">Modal content goes here</div>
</BaseModal>;`,
  },
  'base-table': {
    render: BaseTablePreview,
    code: `import { BaseTable } from '@tarikukebede/mezmer';

type Row = { id: number; name: string; status: string };

const rows: Row[] = [
  { id: 1, name: 'Payment Service', status: 'active' },
  { id: 2, name: 'Audit Service', status: 'inactive' },
];

<BaseTable<Row>
  data={rows}
  columns={[
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      type: CellType.TEXT,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      type: CellType.STATUS,
      sortable: true,
    },
  ]}
  onSortChange={(sortBy, sortOrder) => console.log(sortBy, sortOrder)}
/>;`,
  },
  button: {
    render: ButtonPreview,
    code: `import { Download } from 'lucide-react';
import { Button, ButtonVariant } from '@tarikukebede/mezmer';

<Button
  label="Export"
  leftIcon={Download}
  rightIcon={Download}
  variant={ButtonVariant.Outlined}
  onClick={() => console.log('export')}
/>;`,
  },
  checkbox: {
    render: CheckboxPreview,
    code: `<Checkbox
  name="acceptTerms"
  label="Terms"
  title="I agree to the terms"
  onCheckChange={(checked) => console.log(checked)}
/>`,
  },
  chip: {
    render: ChipPreview,
    code: `import { Circle } from 'lucide-react';

<Chip
  label="Synced"
  icon={Circle}
  variant="secondary"
  size="md"
  onRemove={() => console.log('remove')}
/>;`,
  },
  'date-picker': {
    render: DatePickerPreview,
    code: `<DatePicker
  name="startDate"
  label="Start Date"
  value="2026-04-18"
  helperText="Choose a start date"
  accessRequirements={['project.startDate.write']}
  resolveAccess={(requirement, mode) => {
    if (mode === 'view')
      return requirement.endsWith('.read') || requirement.endsWith('.write');
    return requirement.endsWith('.write');
  }}
  onChange={(change) => {
    console.log(change.target.name, change.target.value);
  }}
/>`,
  },
  'details-card': {
    render: DetailsCardPreview,
    code: `import { FileText, Archive } from 'lucide-react';
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
/>;`,
  },
  'drop-down': {
    render: DropDownPreview,
    code: `import { DropDown } from '@tarikukebede/mezmer';

<DropDown
  label="Country"
  value=""
  placeholder="Select country"
  options={[
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
  ]}
  onChange={(next) => console.log(next)}
/>;`,
  },
  icon: {
    render: IconPreview,
    code: `import { Bell } from 'lucide-react';

<Icon
  icon={Bell}
  className="h-4 w-4 text-muted-foreground"
  aria-label="Alerts"
/>;`,
  },
  image: {
    render: ImagePreview,
    code: `<Image src="/avatar.png" alt="User avatar" size="md" loading="lazy" />`,
  },
  input: {
    render: InputPreview,
    code: `<Input
  name="email"
  label="Email"
  value=""
  onChange={() => {}}
  placeholder="name@company.com"
/>`,
  },
  page: {
    render: PagePreview,
    code: `import { Plus } from 'lucide-react';
import { ButtonVariant, Page, Search } from '@tarikukebede/mezmer';

<Page
  searchPlaceholder="Search users"
  onSearch={(value) => console.log(value)}
  actions={[
    {
      name: 'Create User',
      onClick: () => console.log('create'),
      icon: Plus,
      variant: ButtonVariant.Default,
      accessRequirements: ['users.create'],
    },
  ]}
  filterSlot={<div className="text-xs text-muted-foreground">Active only</div>}
>
  <div className="rounded-md border p-4">Page content</div>
</Page>;

<Search
  placeholder="Global search"
  onChange={(value) => console.log('search term', value)}
/>;`,
  },
  search: {
    render: SearchPreview,
    code: `import { Search } from '@tarikukebede/mezmer';

<Search placeholder="Search users" onChange={(value) => console.log(value)} />;`,
  },
};

function ExampleTabsContent({
  component,
}: {
  component: ComponentExampleId;
}): JSX.Element {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copyState, setCopyState] = useState<'idle' | 'done' | 'error'>('idle');

  const example = useMemo(() => EXAMPLES[component], [component]);
  const Preview = example.render;
  const codeLines = useMemo(() => example.code.split('\n'), [example.code]);
  const highlightedLines = useMemo(
    () => codeLines.map((line) => highlightTsxLine(line)),
    [codeLines],
  );
  const previewPanelId = `${component}-preview-panel`;
  const codePanelId = `${component}-code-panel`;
  const previewTabId = `${component}-preview-tab`;
  const codeTabId = `${component}-code-tab`;

  async function copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopyState('done');
    } catch {
      setCopyState('error');
    }

    setTimeout(() => {
      setCopyState('idle');
    }, 1500);
  }

  return (
    <div className="component-example-tabs">
      <div
        className="component-example-tabs__controls"
        role="tablist"
        aria-label="Example tabs"
      >
        <button
          id={previewTabId}
          type="button"
          role="tab"
          aria-controls={previewPanelId}
          aria-selected={activeTab === 'preview'}
          className={`component-example-tabs__button ${
            activeTab === 'preview' ? 'is-active' : ''
          }`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          id={codeTabId}
          type="button"
          role="tab"
          aria-controls={codePanelId}
          aria-selected={activeTab === 'code'}
          className={`component-example-tabs__button ${
            activeTab === 'code' ? 'is-active' : ''
          }`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>

      <div
        id={previewPanelId}
        role="tabpanel"
        aria-labelledby={previewTabId}
        hidden={activeTab !== 'preview'}
        className="component-example-tabs__panel"
      >
        {activeTab === 'preview' ? (
          <div className="component-example-tabs__preview">
            <Preview />
          </div>
        ) : null}
      </div>

      <div
        id={codePanelId}
        role="tabpanel"
        aria-labelledby={codeTabId}
        hidden={activeTab !== 'code'}
        className="component-example-tabs__panel"
      >
        {activeTab === 'code' ? (
          <div className="component-example-tabs__code-viewer">
            <div className="component-example-tabs__code-toolbar">
              <span className="component-example-tabs__code-lang">tsx</span>
              <button
                type="button"
                className="component-example-tabs__copy-btn"
                onClick={copyCode}
                aria-label="Copy code snippet"
              >
                {copyState === 'idle'
                  ? 'Copy'
                  : copyState === 'done'
                    ? 'Copied'
                    : 'Failed'}
              </button>
            </div>

            <div className="component-example-tabs__code-scroll">
              <ol className="component-example-tabs__code-lines">
                {highlightedLines.map((lineTokens, index) => (
                  <li key={`${component}-code-line-${index + 1}`}>
                    <code>
                      {lineTokens.length === 0 ? ' ' : null}
                      {lineTokens.map((token, tokenIndex) => (
                        <span
                          key={`${component}-code-line-${index + 1}-token-${tokenIndex + 1}`}
                          className={
                            token.kind === 'plain'
                              ? undefined
                              : `component-example-tabs__token component-example-tabs__token--${token.kind}`
                          }
                        >
                          {token.value}
                        </span>
                      ))}
                    </code>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ComponentExampleTabs({
  component,
}: {
  component: ComponentExampleId;
}): JSX.Element {
  return <ExampleTabsContent component={component} />;
}
