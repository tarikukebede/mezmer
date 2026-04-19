import type { AutocompleteAccessResolver } from './types';

const canAccess = (
  requirements: string[],
  resolveAccess: AutocompleteAccessResolver | undefined,
  mode: 'view' | 'edit',
): boolean => {
  if (!requirements.length || !resolveAccess) {
    return true;
  }

  return requirements.some((requirement) => resolveAccess(requirement, mode));
};

export const resolveAutocompleteAccessState = (
  requirements: string[] | undefined,
  resolveAccess: AutocompleteAccessResolver | undefined,
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
