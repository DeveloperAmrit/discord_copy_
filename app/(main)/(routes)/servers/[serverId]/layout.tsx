import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import ServerSidebar from '@/components/server/server-sidebar'


const ServerIdLayout = async ({children, params}:{children:React.ReactNode; params: {serverId: string}}) => {
    const profile = await currentProfile()

    if(!profile){
        const {redirectToSignIn} = await auth()
        return redirectToSignIn()
    }

    const server = db.server.findUnique({
        where:{
            id: params.serverId,
            members: {
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect('/')
    }

  return (
    <div className='h-full'>
        <div 
        className='fixed md:flex h-full w-60 z-20 flex-col inset-y-0'
        >
            <ServerSidebar serverId={params.serverId}/>
        </div>
        <main className='h-full md:pl-60'>
            {children}
        </main>
    </div>
  )
}

export default ServerIdLayout