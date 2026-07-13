import { Controller } from 'react-hook-form'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'
import { useMemberForm } from '@/features/rooms/hooks/use-member-form.ts'
import type { MemberFormProps } from '@/features/rooms/members/member-form-props.ts'

const Roles = [RoomRole.Admin, RoomRole.User]

export function MemberForm({ roomId }: MemberFormProps) {
  const { submit, isPending, error, control } = useMemberForm({ roomId })

  return (
    <form onSubmit={submit} className="flex flex-col gap-2" noValidate>
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex-1 min-w-56">
          <ControlledInput
            name="email"
            label="Add member by email"
            type="email"
            control={control}
          />
        </div>

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="flex gap-1">
              {Roles.map(role => (
                <UiButton
                  key={role}
                  type="button"
                  size="sm"
                  variant={field.value === role ? 'primary' : 'outline'}
                  onClick={() => field.onChange(role)}
                >
                  {role}
                </UiButton>
              ))}
            </div>
          )}
        />

        <UiButton type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Adding…' : 'Add'}
        </UiButton>
      </div>

      {error && <span className="text-sm text-destructive">{error}</span>}
    </form>
  )
}
