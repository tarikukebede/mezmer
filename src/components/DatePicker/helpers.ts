import type { DatePickerProps } from './types';

const dateLabelFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

const canAccess = (
  requirements: string[] | undefined,
  resolveAccess: DatePickerProps['resolveAccess'],
  mode: 'view' | 'edit',
): boolean => {
  if (!requirements?.length || !resolveAccess) {
    return true;
  }

  return requirements.some((requirement) => resolveAccess(requirement, mode));
};

export const formatDateLabel = (value: string) => {
  const parsedDate = parseDateValue(value);
  if (!parsedDate) {
    return value;
  }

  return dateLabelFormatter.format(parsedDate);
};

export const parseDateValue = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const parts = value.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts.map(Number);
    if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
      return new Date(year, month - 1, day);
    }
  }

  const parsedFallback = new Date(value);
  if (Number.isNaN(parsedFallback.getTime())) {
    return undefined;
  }

  return parsedFallback;
};

export const toLocalDateValue = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const resolveDatePickerAccessState = (
  requirements: string[] | undefined,
  resolveAccess: DatePickerProps['resolveAccess'],
) => {
  const normalizedRequirements = requirements ?? [];
  const hasAccessConfig =
    normalizedRequirements.length > 0 && Boolean(resolveAccess);

  const readRequirements = normalizedRequirements.filter((requirement) =>
    requirement.endsWith('.read'),
  );
  const writeRequirements = normalizedRequirements.filter((requirement) =>
    requirement.endsWith('.write'),
  );

  let viewRequirements = normalizedRequirements;
  if (readRequirements.length > 0) {
    viewRequirements = readRequirements;
  } else if (writeRequirements.length > 0) {
    viewRequirements = [];
  }

  const editRequirements =
    writeRequirements.length > 0 ? writeRequirements : normalizedRequirements;

  let canView = true;
  if (hasAccessConfig && viewRequirements.length > 0) {
    canView = canAccess(viewRequirements, resolveAccess, 'view');
  }

  let canEdit = true;
  if (hasAccessConfig) {
    canEdit = canAccess(editRequirements, resolveAccess, 'edit');
  }

  return {
    canView,
    canEdit,
  };
};
