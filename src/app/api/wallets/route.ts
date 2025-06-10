import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/utils/db";
import {getToken} from "next-auth/jwt";

interface AddWalletError {
    message: string;
}
interface DeleteWalletError {
    message: string;
}

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
export async function POST(req : NextRequest) {
    const token = await getToken({req});
    if (!token?.user_id) {
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status: 401});
    }
    const data = await req.json();
    try{
        await prisma.accounts.create({
            data: {
                user_id: token.user_id!,
                name: data.walletType,
                balance: data.balance,
                isPrimary: data.isPrimary
            }
        })
        console.log(token.user_id);
        return NextResponse.json({success: true});
    }catch (e){
        const addWalletError : AddWalletError = {
            message: e instanceof Error ? e.message : "Unknown error occurred"
        }
        return NextResponse.json({ success: false, addWalletError });
    }

}
export async function DELETE(req : NextRequest) {
    const token = await getToken({req});
    if(!token?.user_id){
        return NextResponse.json({error: `Unauthorized. Token ${token}`}, {status: 401})
    }
    const data = await req.json();
    try{
        if(data.deleteTransactions){
            await prisma.transactions.deleteMany({
                where: {
                    AND:[
                        {account_id: data.walletId},
                        {user_id: token.user_id}
                    ]

                }
            })
            await prisma.accounts.deleteMany({
                where: {
                    AND:[
                        {account_id: data.walletId},
                        {user_id: token.user_id}
                    ]
                }
            })
        }else{
            await prisma.accounts.deleteMany({
                where: {
                    AND:[
                        {account_id: data.walletId},
                        {user_id: token.user_id}
                    ]
                }
            })
        }
        return NextResponse.json({success: true});
    }catch (e){
        const deleteWalletError : DeleteWalletError = {
            message: e instanceof Error ? e.message : "Unknown error occurred"
        }
        return NextResponse.json({success: false, deleteWalletError});
    }
}
