import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/utils/db";
import {getToken} from "next-auth/jwt";

export async function GET(req : NextRequest){
    const token = await getToken({req});
    if(!token?.user_id){
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status : 401});
    }

    const data = await(
        prisma.transactions.findMany({
            where: {user_id : token.user_id},
            take: 4,
            select: {
                amount: true,
                date: true,
                category: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        })
    )
    return NextResponse.json(data);
}