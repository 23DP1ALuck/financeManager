import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/utils/db";
import {getToken} from "next-auth/jwt";

export async function GET(req : NextRequest){
    const token = await getToken({req});
    const params = new URLSearchParams(req.url.split('?')[1]);
    const selectedWallet = Number(params.get('walletId'));
    console.log(selectedWallet);
    if(!token?.user_id){
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status : 401});
    }

    const data = await(
        prisma.transactions.findMany({
            where: {
                AND: [{user_id: token.user_id}, {account_id: selectedWallet}]
            },
            select: {
                transaction_id: true,
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
        }))
    return NextResponse.json({ success: true, data });
}