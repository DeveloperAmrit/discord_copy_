"use client";

import React, { useState } from 'react'
import { useModal } from '@/hooks/use-modal-store';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';



const InviteModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();
    const origin = useOrigin()

    const { server } = data;

    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    const isModalOpen = isOpen && type === "invite"

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const onNew = async()=>{
        try{
            setIsLoading(true);
            const response = await axios.patch(`/api/server/${server?.id}/invite-code`)

            onOpen("invite", {server: response.data})
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0">
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-center text-2xl font-bold'>
                        Invite friends
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label
                        className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                    >
                        Server Invite link
                    </Label>
                    <div className='flex items-center gap-x-2'>
                        <Input
                            disabled={isLoading}
                            className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                            value={inviteUrl}
                        />
                        <Button size="icon" disabled={isLoading} onClick={onCopy}>
                            {copied
                            ? <Check className='w-4 h-4'/> 
                            :<Copy className='w-4 h-4' />
                            }
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className='text-xs text-zinc-500 mt-4'
                    >
                        Generate a new link
                        <RefreshCw className='w-4 h-4 ml-2' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal

