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
        { key: 'name', label: 'Name' },
        { key: 'status', label: 'Status', sortable: true },
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
    code: `type Row = { id: number; name: string; status: string };

const rows: Row[] = [
  { id: 1, name: 'Payment Service', status: 'active' },
  { id: 2, name: 'Audit Service', status: 'inactive' },
];

<BaseTable<Row>
  data={rows}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', sortable: true },
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

  const example = useMemo(() => EXAMPLES[component], [component]);
  const Preview = example.render;

  return (
    <div className="component-example-tabs">
      <div
        className="component-example-tabs__controls"
        role="tablist"
        aria-label="Example tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'preview'}
          className={`component-example-tabs__button ${
            activeTab === 'preview' ? 'is-active' : ''
          }`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'code'}
          className={`component-example-tabs__button ${
            activeTab === 'code' ? 'is-active' : ''
          }`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>

      {activeTab === 'preview' ? (
        <div className="component-example-tabs__panel" role="tabpanel">
          <div className="component-example-tabs__preview">
            <Preview />
          </div>
        </div>
      ) : (
        <div className="component-example-tabs__panel" role="tabpanel">
          <pre className="component-example-tabs__code">
            <code>{example.code}</code>
          </pre>
        </div>
      )}
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
