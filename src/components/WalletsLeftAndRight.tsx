"use client"
import WalletsListAndAddContainer from "@/components/WalletsListAndAddContainer";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Wallet} from "@/lib/types";
import WalletLastTransactions from "@/components/WalletLastTransactions";




const WalletsLeftAndRight = () => {
    const [selectedWalletInformation, setSelectedWalletInformation] = useState<Wallet|null|undefined>();
    useEffect(() => {
        console.log("third", selectedWalletInformation)
    }, [selectedWalletInformation, setSelectedWalletInformation]);
    return(
        <div className="flex w-full h-auto px-2 gap-3">
            <div className="flex flex-col w-1/2 bg-black/5 p-6 rounded-xl gap-5">
                <WalletsListAndAddContainer showWalletInfo={setSelectedWalletInformation}/>
            </div>
            <div className="flex w-1/2 h-auto">
                <WalletLastTransactions selectedWallet={selectedWalletInformation}/>
            </div>
        </div>
    );
}
export default WalletsLeftAndRight;