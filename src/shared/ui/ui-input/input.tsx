import { cn } from '@/shared/utils/utils.ts'
import type { UiInputProps } from '@/shared/ui/ui-input/ui-input-props.ts'
import './styles/ui-input.scss'

function UiInput({
  className,
  size = 'default',
  type = 'text',
  value,
  onChange,
  ...props
}: UiInputProps) {
  return (
    <input
      {...props}
      data-slot="input"
      data-size={size}
      type={type}
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
      className={cn('input', className)}
    />
  )
}

export { UiInput }
