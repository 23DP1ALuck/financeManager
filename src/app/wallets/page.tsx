import {sections} from "@/app/constants";
import Header from "@/components/Header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";
import {redirect} from "next/navigation";
import WalletsMain from "@/components/WalletsMain";
import {prisma} from "@/lib/utils/db";
import {Session} from "next-auth";
import {Wallet} from "@/lib/types";

const wallets = async (session : Session): Promise<Wallet[]> => {
    return prisma.accounts.findMany({
        where: {
            user_id: session?.user.id
        },
        select: {
            account_id: true,
            name: true,
            balance: true,
            isPrimary: true
        }
    });
}

export default async function Wallets() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/auth/login")
    }
    const walletsProps = await wallets(session);
    return(
        <>
            <Header sections={sections}/>
            <WalletsMain walletProps={walletsProps}/>
        </>
    )
}