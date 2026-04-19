import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

import {
  formErrorTextClassName,
  formHelperTextClassName,
} from '@lib/feedbackText';
import { Label } from '@ui/label';
import { cn } from '@lib/utils';
import type { DropDownProps } from './types';
import { resolveDropDownAccessState } from './helpers';

export const DropDown = (props: Readonly<DropDownProps>) => {
  const {
    options,
    value,
    onChange,
    label,
    placeholder = 'Select an option',
    renderOption,
    required,
    disabled,
    helperText,
    error,
    onOpenChange,
    accessRequirements,
    resolveAccess,
    className,
  } = props;

  const { canView, canEdit } = resolveDropDownAccessState(
    accessRequirements,
    resolveAccess,
  );

  if (!canView) {
    return null;
  }

  const selectedOption = options.find((option) => option.value === value);
  const resolvedDisabled = disabled || !canEdit;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/85">
            {label}
            {required && <span className="text-destructive"> *</span>}
          </Label>
        </div>
      )}
      <Select
        value={value}
        onValueChange={onChange}
        disabled={resolvedDisabled}
        onOpenChange={onOpenChange}
      >
        <SelectTrigger
          className={cn(
            '[&>span]:text-[length:var(--mz-control-font-size)] [&>span]:text-muted-foreground',
            error && 'border-destructive',
          )}
          aria-invalid={error ? 'true' : undefined}
        >
          <SelectValue placeholder={placeholder}>
            {selectedOption && (
              <span className="text-[length:var(--mz-control-font-size)] text-foreground">
                {renderOption
                  ? renderOption(selectedOption)
                  : selectedOption.label}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="max-h-[200px] overflow-y-auto border-t border-border pt-1">
            {options.length === 0 ? (
              <div className="px-2 py-6 text-center text-[length:var(--mz-control-font-size)] text-muted-foreground">
                No options found
              </div>
            ) : (
              options.map((option, index) => (
                <div key={option.value}>
                  <SelectItem
                    value={option.value}
                    className="cursor-pointer py-2 text-[length:var(--mz-control-font-size)] transition-colors hover:bg-accent focus:bg-accent"
                  >
                    <span className="truncate text-[length:var(--mz-control-font-size)]">
                      {renderOption ? renderOption(option) : option.label}
                    </span>
                  </SelectItem>
                  {index < options.length - 1 && (
                    <div className="mx-2 border-b border-border" />
                  )}
                </div>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
      {(error || helperText) && (
        <div className="space-y-1">
          {error && <p className={formErrorTextClassName}>{error}</p>}
          {helperText && (
            <p className={formHelperTextClassName}>{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};
