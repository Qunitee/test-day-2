import { areIntervalsOverlapping, parse, type Interval } from 'date-fns'
import type { BookingI } from '@/shared/models/booking/booking.model.ts'
import { DateTimeFormat } from '@/shared/constants/date-time-format.ts'

type BookingSlot = Pick<BookingI, 'date' | 'startTime' | 'endTime'>



function toInterval(slot: BookingSlot): Interval {
  return {
    start: parse(`${slot.date} ${slot.startTime}`, DateTimeFormat, new Date()),
    end: parse(`${slot.date} ${slot.endTime}`, DateTimeFormat, new Date()),
  }
}

export function hasTimeConflict(
  candidate: BookingSlot,
  existing: BookingI[],
  ignoreId?: string
): boolean {
  const target = toInterval(candidate)

  return existing.some(booking => {
    if (booking.id === ignoreId) return false
    if (booking.date !== candidate.date) return false
    return areIntervalsOverlapping(target, toInterval(booking))
  })
}
