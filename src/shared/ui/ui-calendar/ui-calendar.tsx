import type { ComponentProps } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import { cn } from '@/shared/utils/utils.ts'
import { UiIcon, type IconName } from '@/shared/ui/ui-icon/ui-icon.tsx'
import { UiDayButton } from '@/shared/ui/ui-calendar/ui-day-button.tsx'

function CalendarChevron({
  orientation,
  className,
}: {
  orientation?: 'left' | 'right' | 'up' | 'down'
  className?: string
}) {
  const name: IconName =
    orientation === 'left'
      ? 'ChevronLeft'
      : orientation === 'right'
        ? 'ChevronRight'
        : 'ChevronDown'
  return <UiIcon name={name} size="sm" className={className} />
}

export function UiCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('bg-popover p-3 [--cell-size:--spacing(9)]', className)}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex items-center justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'flex size-(--cell-size) items-center justify-center rounded-md p-0 cursor-pointer hover:bg-muted aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'flex size-(--cell-size) items-center justify-center rounded-md p-0 cursor-pointer hover:bg-muted aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-(--cell-size) items-center justify-center px-(--cell-size) text-sm font-medium',
          defaultClassNames.month_caption
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 text-[0.8rem] font-normal text-muted-foreground select-none',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        day: cn(
          'group/day relative aspect-square h-full w-full p-0 text-center select-none',
          defaultClassNames.day
        ),
        today: cn(
          'rounded-md bg-muted/60 data-[selected=true]:bg-transparent',
          defaultClassNames.today
        ),
        outside: cn('text-muted-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: CalendarChevron as never,
        DayButton: UiDayButton,
      }}
      {...props}
    />
  )
}
