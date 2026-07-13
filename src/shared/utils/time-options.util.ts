/**
 * Builds `HH:mm` time slots across a day at the given step.
 * @param stepMinutes step between slots (default 30).
 */
export function buildTimeOptions(stepMinutes: number = 30): string[] {
  const options: string[] = []
  for (let minutes = 0; minutes < 24 * 60; minutes += stepMinutes) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }
  return options
}
