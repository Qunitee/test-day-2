import type { ComponentProps } from 'react'
import type { DayButton } from 'react-day-picker'
import { cn } from '@/shared/utils/utils.ts'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'

export function UiDayButton({
  modifiers,
  className,
  day,
  ...props
}: ComponentProps<typeof DayButton>) {
  const isSelected = Boolean(modifiers.selected)

  return (
    <UiButton
      type="button"
      variant={isSelected ? 'primary' : 'ghost'}
      size="sm"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        'flex aspect-square size-(--cell-size) items-center justify-center p-0 font-normal',
        className
      )}
      {...props}
    />
  )
}
