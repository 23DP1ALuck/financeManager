import Card from "@/components/icons/Card";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";
import {prisma} from "@/lib/utils/db";

const getWallets  = async () => {
    const session = await getServerSession(authOptions);
    return (
        prisma.accounts.findMany({
            where: {user_id: session?.user.id},
            select: {
                balance: true
            }
        })
    );
}

const BalanceBlock = async () => {
    const walletsBalances : {balance : number}[] = await getWallets();
    const sum = walletsBalances.reduce((acc, curr) => acc + curr.balance, 0)
    return (
        <div className="flex justify-center items-center gap-2 bg-black/5 w-full rounded-2xl p-1 border-1 border-black/10">
            <Card className="text-black/70 size-6"/>
            <h1 className="text-black/70 font-bold text-xl">
                Total balance: €{sum}
            </h1>
        </div>
    );
}
export default BalanceBlock;