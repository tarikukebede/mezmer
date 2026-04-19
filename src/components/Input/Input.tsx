import { forwardRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { cn } from '@lib/utils';
import {
  formErrorTextClassName,
  formHelperTextClassName,
  formInfoTextClassName,
} from '@lib/feedbackText';
import { Label } from '@ui/label';
import { Input as ShadcnInput } from '@ui/input';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    label,
    error,
    helperText,
    infoText,
    endAdornment,
    name,
    value = '',
    onChange,
    required,
    accessRequirements,
    resolveAccess,
    disabled,
    onKeyDown,
    ...rest
  } = props;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const requirements = accessRequirements ?? [];
  const hasAccessResolver = requirements.length > 0 && Boolean(resolveAccess);

  const readRequirements = requirements.filter((requirement) =>
    requirement.endsWith('.read'),
  );
  const writeRequirements = requirements.filter((requirement) =>
    requirement.endsWith('.write'),
  );

  const viewRequirements =
    readRequirements.length > 0
      ? readRequirements
      : writeRequirements.length > 0
        ? []
        : requirements;

  const editRequirements =
    writeRequirements.length > 0 ? writeRequirements : requirements;

  const hasViewPermission = !hasAccessResolver
    ? true
    : viewRequirements.length === 0
      ? true
      : viewRequirements.some((requirement) =>
          resolveAccess?.(requirement, 'view'),
        );

  if (!hasViewPermission) {
    return null;
  }

  const hasEditPermission = !hasAccessResolver
    ? true
    : editRequirements.some((requirement) =>
        resolveAccess?.(requirement, 'edit'),
      );

  const isReadOnly = hasViewPermission && !hasEditPermission;

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-xs text-muted-foreground" htmlFor={name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        <ShadcnInput
          {...rest}
          id={name}
          name={name}
          required={required}
          type={rest.type ?? 'text'}
          className={cn(
            error && 'border-destructive',
            'text-[length:var(--mz-control-font-size)] placeholder:text-[length:var(--mz-control-font-size)] placeholder:text-muted-foreground/60',
            endAdornment && 'pr-10',
            className,
          )}
          ref={ref}
          onChange={handleInputChange}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            e.stopPropagation();
            onKeyDown?.(e);
          }}
          value={value}
          disabled={isReadOnly || disabled}
          placeholder={rest.placeholder}
          aria-invalid={error ? 'true' : undefined}
        />
        {endAdornment ? (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {endAdornment}
          </div>
        ) : null}
      </div>
      {(error || helperText || infoText) && (
        <div className="space-y-1">
          {error && <p className={formErrorTextClassName}>{error}</p>}
          {helperText && (
            <p className={formHelperTextClassName}>{helperText}</p>
          )}
          {infoText && <p className={formInfoTextClassName}>{infoText}</p>}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
