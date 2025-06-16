import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/utils/db";
import {getToken} from "next-auth/jwt";

export async function GET(req : NextRequest){
    const token = await getToken({req});
    if(!token?.user_id){
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status : 401});
    }

    const filters: {user_id: number, account_id?: number, category_id?: number, date?: { gte: Date, lte: Date }}= {
        user_id: token.user_id
    };

    const params = new URLSearchParams(req.url.split('?')[1]);
    const selectedWallet = Number(params.get('walletId'));
    const selectedCategory = Number(params.get('categoryId'));
    const selectedFrom = params.get('from');
    const selectedTo = params.get('to');
    if(selectedWallet){
        filters.account_id = selectedWallet;
    }
    if(selectedCategory){
        filters.category_id = selectedCategory;
    }
    if (selectedFrom && selectedTo) {
        filters.date = {
            gte: new Date(selectedFrom),
            lte: new Date(selectedTo),
        };
    }

    const data = await(
        prisma.transactions.findMany({
            where:
                filters
            ,
            select: {
                transaction_id: true,
                amount: true,
                date: true,
                transaction_name: true,
                transaction_description: true,
                category: {
                    select: {
                        category_id: true,
                        name: true
                    }
                },
                account: {
                    select: {
                        account_id: true,
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