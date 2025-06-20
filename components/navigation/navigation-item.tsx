"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ActionTooltip from '@/components/action-tooltip' 
import { useRouter, useParams } from 'next/navigation'

interface NavigationItemProps {
    id: string
    name: string
    imageUrl: string
}

const NavigationItem = ({id,name,imageUrl}:NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick = ()=>{
        router.push(`/servers/${id}`)
    }
  return (
    <ActionTooltip
    side='right'
    align='center'
    label={name}
    >
        <button onClick={onClick} className='flex items-center justify-center relative group w-full'>
            <div className={cn(
                "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id? "h-[36px]" : "h-[8px]"
            )}/>
            <div className={cn(
                "relative group flex h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
            )}>
                <Image 
                    fill
                    src={imageUrl}
                    alt='Channel'
                />
            </div>
        </button>
    </ActionTooltip>
  )
}

export default NavigationItem