"use client"
import WalletsListAndAddContainer from "@/components/WalletsListAndAddContainer";
import {useEffect, useState} from "react";
import {Wallet} from "@/lib/types";
import WalletLastTransactions from "@/components/WalletLastTransactions";
import DeleteButton from "@/components/DeleteButton";


const WalletsLeftAndRight = () => {
    // TODO : responsive
    // state for selected wallet info show
    const [selectedWalletInformation, setSelectedWalletInformation] = useState<Wallet|null|undefined>();
    // state for delete wallet, if wallet is deleted, set selectedWalletInformation to true
    const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false)

    // state changing
    const handleDeleteSuccess = () => {
        setDeleteTrigger(prev => !prev)
    }
    return(
        <div className="flex w-full h-full px-2 gap-3">
            <div className="flex flex-col justify-between w-1/2">
                <WalletsListAndAddContainer selectedWalletAction={setSelectedWalletInformation} deleteTrigger={deleteTrigger}/>
                <DeleteButton wallet={selectedWalletInformation} handleDeleteSuccess={handleDeleteSuccess}/>
            </div>
            <div className="flex w-1/2 h-auto max-h-[400px]">
                <WalletLastTransactions selectedWallet={selectedWalletInformation}/>
            </div>
        </div>
    );
}
export default WalletsLeftAndRight;