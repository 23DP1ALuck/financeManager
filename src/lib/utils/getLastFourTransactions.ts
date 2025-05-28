import {prisma} from "./db";


type Transactions = {
    amount : number,
    date : Date,
    category : {
        name: string
    },
}[]

export const getLastFourTransactions = async (userId : number) : Promise<Transactions | null> => {
    return prisma.transactions.findMany({
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
    });
};