import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import ServerHeader from './server-header'
import { ChannelType } from '@/lib/generated/prisma'

interface ServerSidebarProps {
    serverId: string
}

const ServerSidebar = async ({serverId}:ServerSidebarProps) => {

    const profile = await currentProfile()
    if(!profile){
        const {redirectToSignIn} = await auth()
        return redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId
        },
        include: {
            channels:{
                orderBy:{
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    if(!server){
        return redirect('/')
    }

    const textChannels = server.channels.filter((channel)=>channel.type===ChannelType.TEXT)
    const audioChannels = server.channels.filter((channel)=> channel.type===ChannelType.AUDIO)
    const videoChannels = server.channels.filter((channel)=>channel.type===ChannelType.VIDEO)
    const members = server.members.filter((member)=>member.profileId!== profile.id)
    const role = server.members.find((member)=> member.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
        <ServerHeader server={server} role={role}/>
        Server Sidebar component
    </div>
  )
}

export default ServerSidebar