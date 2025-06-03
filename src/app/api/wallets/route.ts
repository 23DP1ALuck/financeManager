import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/utils/db";
import {getToken} from "next-auth/jwt";

export async function GET(req : NextRequest) {
    const token = await getToken({req});
    if (!token?.user_id) {
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status: 401});
    }
    const data =
        await prisma.accounts.findMany({
            where: {
                user_id : token.user_id
            },
            select: {
                account_id: true,
                name: true,
                balance: true,
                isPrimary: true
            }
        })
    return NextResponse.json(data);
}