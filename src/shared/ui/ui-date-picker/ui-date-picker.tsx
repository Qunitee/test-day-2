import { useState } from 'react'
import { format, isValid, parse } from 'date-fns'
import {
  PopoverContent,
  PopoverTrigger,
  UiPopover,
} from '@/shared/ui/ui-popover/ui-popover.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon.tsx'
import { UiCalendar } from '@/shared/ui/ui-calendar/ui-calendar.tsx'
import { cn } from '@/shared/utils/utils.ts'
import type { UiDatePickerProps } from '@/shared/ui/ui-date-picker/ui-date-picker-props.ts'

const VALUE_FORMAT = 'yyyy-MM-dd'

export function UiDatePicker({
  value,
  onChange,
  id,
  placeholder = 'Pick a date',
  disabled = false,
  'aria-invalid': ariaInvalid,
}: UiDatePickerProps) {
  const [open, setOpen] = useState(false)

  const parsed = value ? parse(value, VALUE_FORMAT, new Date()) : undefined
  const selected = parsed && isValid(parsed) ? parsed : undefined

  return (
    <UiPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UiButton
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          className={cn(
            'w-full justify-start gap-2 font-normal',
            !selected && 'text-muted-foreground'
          )}
        >
          <UiIcon name="Calendar" size="sm" />
          {selected ? format(selected, 'PP') : placeholder}
        </UiButton>
      </PopoverTrigger>
      <PopoverContent>
        <UiCalendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={date => {
            if (!date) return
            onChange?.(format(date, VALUE_FORMAT))
            setOpen(false)
          }}
        />
      </PopoverContent>
    </UiPopover>
  )
}
