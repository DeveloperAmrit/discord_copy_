"use client"

import { MemberRole } from '@/lib/generated/prisma'
import { ServerWithMembersWithProfile } from '@/types'
import React from 'react'
import { useModal } from '@/hooks/use-modal-store'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus } from 'lucide-react'

interface ServerHeaderProps {
    server: ServerWithMembersWithProfile
    role?: MemberRole

}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {

    const {onOpen}= useModal()

    const isAdmin = MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className='focus:outline-0'
                asChild
            >
                <button
                    className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition
            '
                >
                    {server.name}
                    <ChevronDown className='h-5 w-5 ml-auto' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'
            >
                {isModerator && (
                    <DropdownMenuItem
                        className='text-indigo-600 dark:text-indigo-400 px-3 py-2 texts-sm cursor-pointer'
                        onClick={()=>onOpen("invite",{server})}
                    >
                        Invite people
                        <UserPlus className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className='px-3 py-2 texts-sm cursor-pointer'
                    >
                        Server Settings
                        <Settings className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className='px-3 py-2 texts-sm cursor-pointer'
                    >
                        Manage Members
                        <Settings className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        className='px-3 py-2 texts-sm cursor-pointer'
                    >
                        Create Channel
                        <PlusCircle className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className='text-rose-500 px-3 py-2 texts-sm cursor-pointer'
                    >
                        Delete Server
                        <Trash className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        className='text-rose-500 px-3 py-2 texts-sm cursor-pointer'
                    >
                        Leave Server
                        <LogOut className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader