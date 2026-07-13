import { MemberRow } from '@/features/rooms/members/member-row.tsx'
import type { MemberListProps } from '@/features/rooms/members/member-list-props.ts'

export function MemberList({
  roomId,
  members,
  isAdmin,
  currentUserEmail,
}: MemberListProps) {
  if (members.length === 0) {
    return <p className="text-sm text-muted-foreground">No members yet.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {members.map(member => (
        <MemberRow
          key={member.email}
          roomId={roomId}
          member={member}
          canRemove={isAdmin && member.email !== currentUserEmail}
        />
      ))}
    </div>
  )
}
