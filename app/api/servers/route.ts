import { NextResponse } from "next/server";
import {v4 as uuidV4 } from 'uuid'

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@/lib/generated/prisma";


export async function POST(req: Request){
    try{
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }

        const server = await db.server.create({
            data:{
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidV4(),
                channels: {
                    create:[
                        {name: "general",profileId: profile.id}
                    ]
                },
                members: {
                    create: [
                        {profileId: profile.id, role: MemberRole.ADMIN}
                    ]
                }
            }
        })

        return NextResponse.json(server)

    }
    catch(error){
        console.log("[SERVER_POST]",error)
        return new NextResponse("Ineternal error", {status:500})
    }
}