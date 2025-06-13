"use client"
import {Transactions, Wallet} from "@/lib/types";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";


type WalletLastTransactionsProps = {
    selectedWallet: Wallet | undefined | null;
}

const WalletLastTransactions =   ({selectedWallet} : WalletLastTransactionsProps) => {
    // TODO : responsive
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log("Last", selectedWallet);
    }, [selectedWallet]);
    const [transactions, setTransactions] = useState<Transactions[]>([])
    // const transactions =
    useEffect(() => {
        if (selectedWallet?.account_id) {
            setIsLoading(true);
            const controller = new AbortController();
            const signal = controller.signal;
            fetch(`/api/transactions/wallets/?walletId=${selectedWallet?.account_id}`, {
                method: "GET",
                signal: signal,
            }).then((res) => res.json()).then((res) => setTransactions(res.data))
                .catch(err => {
                    if (err.name === "AbortError"){
                        console.log("Cancelled", err.message);
                    }else{
                        console.error("Undefined error occurred")
                    }
                }).finally(() => setIsLoading(false));
            return () => {
                controller.abort();
            }
        }
    }, [selectedWallet]);
    useEffect(() => {
        console.log("transactions updated:", transactions);
    }, [transactions]);

    return(
        <div className="flex w-full h-full">
            <div className="flex flex-col px-4 py-7 gap-7 w-full h-auto bg-black/5 rounded-2xl border-1 border-black/10">
                <div className="w-full">
                    <h1 className="font-bold text-black/90 text-2xl">Transactions</h1>
                </div>
                <div className="flex flex-col h-full gap-5 max-h-[calc(400px-100px)] overflow-y-auto scrollbar-thumb-sky-700 scrollbar-custom">
                    {isLoading ? <Loading/> : (transactions.length > 0 ? transactions.map(({transaction_id,amount, date, category}) => (
                        <div key={transaction_id} style={{ willChange: 'transform' }}
                             className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between">
                            <div className="flex w-1/3 justify-between items-center">
                                <h1 className="text-black/90 font-semibold">{new Date(date).toDateString()}</h1>
                                <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                            </div>
                            <div className="flex w-1/3 justify-center items-center">
                                <h1 className="text-black/90 font-semibold">{category.name}</h1>
                            </div>
                            <div className="flex w-1/3 justify-between items-center">
                                <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                                <h1 className="text-black/90 font-semibold">{amount}$</h1>
                            </div>
                        </div>
                    )) : <div className="flex justify-center items-center text-center w-full h-full">
                        <h1 className="text-3xl text-black/75">No transactions yet</h1>
                    </div>)}
                </div>
            </div>
        </div>
    );
}
export default WalletLastTransactions;