"use client"
import {useEffect} from "react";

// type Wallets = {
//     account_id: number,
//     name: WALLETS,
//     balance: number,
//     isPrimary: boolean
// }[]
//
// const getUserWallets = async () : Promise<Wallets> => {
//     const session = await getServerSession(authOptions);
//     return(
//         await prisma.accounts.findMany({
//             where: {
//                 user_id : session?.user.id
//             },
//             select: {
//                 account_id: true,
//                 name: true,
//                 balance: true,
//                 isPrimary: true
//             }
//         })
//     )
// }


export const Wallets =  () => {
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/wallets");
            const json = await res.json();
            console.log(json);
        };
        fetchData();
    }, [])
    return (
        <div className="flex flex-col w-full gap-5">
            {/*{wallets.map(({account_id, name, balance, isPrimary}) => (*/}
            {/*    <div key={account_id} className="flex gap-2 p-2 w-full h-auto bg-black/5 rounded-2xl border-1 border-black/10 relative">*/}
            {/*        <div className="flex flex-col gap-1w-full h-10 px-2">*/}
            {/*            <h1 className="text-black/90 font-semibold">{name}</h1>*/}
            {/*            <h1 className="text-black/40 font-medium">{balance}$</h1>*/}
            {/*        </div>*/}
            {/*        {isPrimary && <div className="flex items-center justify-center text-xs h-fit p-0.5 text-white/90 font-semibold bg-blue-600 rounded-full">Marked as primary</div>}*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
}
