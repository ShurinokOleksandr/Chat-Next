import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
interface Params {
    conversationId?:string
}

export async function DELETE(request:Request,{params}:{params:Params}){
    try {
        const {conversationId} = params

        const currentUser = await getCurrentUser()

        if(!currentUser){
            return new NextResponse('Unauthorized',{status:401})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        })

        if(!existingConversation){
            return new NextResponse("Invalid id",{status:400})
        }

        const deleteConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        })


        return NextResponse.json(deleteConversation)
    }catch (e:any) {
        return new NextResponse("Error delete",{status:500})
    }


}