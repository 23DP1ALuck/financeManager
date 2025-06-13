import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {prisma} from "@/lib/utils/db";

type CategoriesSpendingWithName = {
    categoryId: number,
    name: string,
    category_spent : number
}

export async function GET (req: NextRequest) {
    const token = await getToken({req});
    if(!token){
        return NextResponse.json({error: `Unauthorized. Token${token}`}, {status : 401});
    }
    // group spendings by category only this month
    const data = await prisma.transactions.groupBy({
        by: ['category_id'],
        where: {
            // TODO: show only outcome
            AND: [
                {user_id: token?.user_id},
                {
                    date: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                    }
                }
            ]

        },
        _sum: {
            amount: true,
        },
    })
    // get all categories
    const categories = await prisma.categories.findMany({
        select: {
            category_id: true,
            name: true,
        }
    })
    // mix first reques and second. to get category name + spendings this month
    const fullCategorySpendingsLastMonth : CategoriesSpendingWithName[] =
        categories.map(cat => {
            // match ids from two responses
            const spending = data.find(d => d.category_id === cat.category_id);
            return {
                categoryId: cat.category_id,
                name: cat.name,
                category_spent: spending?._sum.amount ? spending._sum.amount : 0,
            }
        })
    return NextResponse.json({ success: true, fullCategorySpendingsLastMonth });
}