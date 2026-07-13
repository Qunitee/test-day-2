import { useMemo, useRef, useState } from 'react'
import {
  PopoverContent,
  PopoverTrigger,
  UiPopover,
} from '@/shared/ui/ui-popover/ui-popover.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon.tsx'
import { buildTimeOptions } from '@/shared/utils/time-options.util.ts'
import { cn } from '@/shared/utils/utils.ts'
import type { UiTimePickerProps } from '@/shared/ui/ui-time-picker/ui-time-picker-props.ts'

export function UiTimePicker({
  value,
  onChange,
  id,
  placeholder = 'Pick time',
  stepMinutes = 30,
  ref,
  nextFocusRef,
  'aria-invalid': ariaInvalid,
}: UiTimePickerProps) {
  const [open, setOpen] = useState(false)
  const justSelected = useRef(false)
  const options = useMemo(() => buildTimeOptions(stepMinutes), [stepMinutes])

  const handleSelect = (time: string) => {
    justSelected.current = true
    onChange?.(time)
    setOpen(false)
  }

  return (
    <UiPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UiButton
          ref={ref}
          id={id}
          type="button"
          variant="outline"
          aria-invalid={ariaInvalid}
          className={cn(
            'w-full justify-start gap-2 font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <UiIcon name="Clock" size="sm" />
          {value || placeholder}
        </UiButton>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-56 overflow-y-auto p-1"
        onCloseAutoFocus={event => {
          if (justSelected.current && nextFocusRef?.current) {
            event.preventDefault()
            nextFocusRef.current.focus()
          }
          justSelected.current = false
        }}
      >
        <div className="flex flex-col gap-0.5">
          {options.map(time => (
            <UiButton
              key={time}
              type="button"
              size="sm"
              variant={time === value ? 'primary' : 'ghost'}
              className="justify-start"
              onClick={() => handleSelect(time)}
            >
              {time}
            </UiButton>
          ))}
        </div>
      </PopoverContent>
    </UiPopover>
  )
}
