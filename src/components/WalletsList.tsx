"use client"
import {Wallet} from "@/lib/types";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

type WalletProps = {
    wallets: Wallet[],
    selectedWalletAction: Dispatch<SetStateAction<Wallet | undefined | null>>
}


export const WalletsList =  ({wallets, selectedWalletAction}: WalletProps) => {
    // TODO : responsive
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>();
    // by default select primary wallet
    useEffect(() => {
        const primaryWallet = wallets.find(wallet => wallet.isPrimary);
        setSelectedWallet(primaryWallet);
    }, [wallets]);
    useEffect(() => {
        selectedWalletAction(selectedWallet);
        console.log("first",selectedWallet);
    }, [selectedWallet, selectedWalletAction]);

    return (
        <div className="flex flex-col w-full gap-5">
            {wallets.length === 0 ? <div className="flex w-full h-full items-center justify-center">
                    <h1 className="text-black/40 font-medium text-3xl text-center">No wallets</h1>
            </div>:
                wallets.map((wallet) => (
                        <div key={wallet.account_id} className="flex justify-between items-center gap-2 p-2 w-full h-auto bg-black/5 rounded-2xl border-1 border-black/10 relative">
                            <div className="flex w-full" onClick={() => setSelectedWallet(wallet)}>
                                <div className="flex flex-col gap-1w-full h-10 px-2">
                                    <h1 className="text-black/90 font-semibold">{wallet.name}</h1>
                                    <h1 className="text-black/40 font-medium">{wallet.balance}$</h1>
                                </div>
                                {wallet.isPrimary && <div className="flex items-center justify-center text-xs h-fit py-0.5 px-1 text-white/90 font-semibold bg-blue-600 rounded-full">Marked as primary</div>}
                            </div>
                            <div className="flex items-center justify-center w-5 h-5 p-1 rounded-full border border-black/10 cursor-pointer" onClick={() => setSelectedWallet(wallet)}>
                                <div className={`w-full h-full rounded-full ${selectedWallet===wallet ? "bg-blue-600/50" : "bg-transparent"}`}/>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}
