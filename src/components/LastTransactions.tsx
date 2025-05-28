import {prisma} from "@/lib/utils/db";
import { getServerSession } from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";

const getTransactions  = async () => {
    const session = await getServerSession(authOptions);
    return (
        prisma.transactions.findMany({
            where: {user_id: session?.user.id},
            take: 4,
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
        })
    );
}
const LastTransactions =  async () => {
    const transactions = await getTransactions();
    return(
        <div className="flex w-full h-full">
            <div className="flex flex-col px-4 py-7 gap-7 w-full h-auto bg-black/5 rounded-2xl border-1 border-black/10">
                <div className="w-full">
                    <h1 className="font-bold text-black/90 text-2xl">Last 4 transactions</h1>
                </div>
                <div className="flex flex-col h-full gap-5">
                    {transactions.length > 0 ? transactions.map(({transaction_id,amount, date, category}) => (
                        <div key={transaction_id} style={{ willChange: 'transform' }}
                             className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between ease-in-out hover:scale-102 duration-300 will-change: transform;">
                            <h1 className="text-black/90 font-semibold">{date.toDateString()}</h1>
                            <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                            <h1 className="text-black/90 font-semibold">{category.name}</h1>
                            <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                            <h1 className="text-black/90 font-semibold">{amount}$</h1>
                        </div>
                    )) : <div className="flex justify-center items-center text-center w-full h-full">
                            <h1 className="text-3xl text-black/75">No transactions yet</h1>
                        </div>}
                </div>

            </div>
        </div>
    );
}
export default LastTransactions;