import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiBadge } from '@/shared/ui/ui-badge/ui-badge.tsx'
import { ConfirmDialog } from '@/shared/components/confirm-dialog/confirm-dialog.tsx'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'
import { useRemoveMember } from '@/features/rooms/hooks/use-room-member-mutations.ts'
import type { MemberRowProps } from '@/features/rooms/members/member-row-props.ts'

export function MemberRow({ roomId, member, canRemove }: MemberRowProps) {
  const removeMember = useRemoveMember()

  return (
    <div className="flex items-center justify-between gap-2 rounded-md px-3 py-2 ring-1 ring-foreground/10">
      <span className="text-sm break-all">{member.email}</span>

      <div className="flex items-center gap-2">
        <UiBadge variant={member.role === RoomRole.Admin ? 'destructive-soft' : 'success-soft'}>
          {member.role}
        </UiBadge>

        {canRemove && (
          <ConfirmDialog
            title="Remove member?"
            description={`${member.email} will lose access to this room.`}
            confirmLabel="Remove"
            isPending={removeMember.isPending}
            onConfirm={() =>
              removeMember.mutateAsync({ roomId, email: member.email })
            }
            trigger={
              <UiButton
                variant="destructive-soft"
                size="sm"
                disabled={removeMember.isPending}
              >
                Remove
              </UiButton>
            }
          />
        )}
      </div>
    </div>
  )
}
