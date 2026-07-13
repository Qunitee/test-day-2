import type { IconButtonProps } from '@/shared/ui/ui-icon-button/ui-icon-button-props.ts'
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon.tsx'
import { Slot } from 'radix-ui'

export function UiIconButton({
  size,
  variant,
  className,
  asChild,
  name,
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="button"
      data-variant={variant}
      className={cn('icon-button', className)}
      data-size={size}
    >
      <UiIcon
        aria-hidden
        name={name}
        size={size ?? (size ? size : 'default')}
      />
    </Comp>
  )
}
