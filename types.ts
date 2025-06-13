import { Member, Profile, Server } from "@/lib/generated/prisma"

export type ServerWithMembersWithProfile = Server & {
    members: (Member & {profile: Profile})[];
} 