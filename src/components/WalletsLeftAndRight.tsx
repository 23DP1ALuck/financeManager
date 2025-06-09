"use client"
import WalletsListAndAddContainer from "@/components/WalletsListAndAddContainer";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Wallet} from "@/lib/types";
import WalletLastTransactions from "@/components/WalletLastTransactions";
import DeleteButton from "@/components/DeleteButton";




const WalletsLeftAndRight = () => {
    // TODO : responsive
    const [selectedWalletInformation, setSelectedWalletInformation] = useState<Wallet|null|undefined>();
    useEffect(() => {
        console.log("third", selectedWalletInformation)
    }, [selectedWalletInformation, setSelectedWalletInformation]);
    return(
        <div className="flex w-full h-full px-2 gap-3">
            <div className="flex flex-col justify-between w-1/2">
                <WalletsListAndAddContainer showWalletInfo={setSelectedWalletInformation}/>
                <DeleteButton/>
            </div>
            <div className="flex w-1/2 h-auto max-h-[400px]">
                <WalletLastTransactions selectedWallet={selectedWalletInformation}/>
            </div>
        </div>
    );
}
export default WalletsLeftAndRight;