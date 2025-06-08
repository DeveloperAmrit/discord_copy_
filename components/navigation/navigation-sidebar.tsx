import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import NavigationAction from '@/components/navigation/navigation-action';

const NavigationSideBar = async () => {
    const profile = await currentProfile();

    if(!profile){
        return redirect('/')
    }

    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

  return (
    <div className='space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1E1F22] py-3'>
        <NavigationAction/>
    </div>
  )
}

export default NavigationSideBar