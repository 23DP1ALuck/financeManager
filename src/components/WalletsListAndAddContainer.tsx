"use client"
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import AddWalletModal from "@/components/AddWalletModal";
import {WalletsList} from "@/components/WalletsList";
import {Wallet} from "@/lib/types";
import {fetchWallets} from "@/lib/utils/fetchWallets";


type SelectedWalletAction = {
    deleteTrigger: boolean,
    selectedWalletAction: Dispatch<SetStateAction<Wallet | undefined | null>>
}


const WalletsListAndAddContainer = ({selectedWalletAction, deleteTrigger} : SelectedWalletAction) => {
    // TODO : responsive
    const [onSuccess, setOnSuccess] = useState<boolean>(false);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [showSelectedWalletInfo, setShowSelectedWalletInfo] = useState<Wallet|undefined|null>();
    useEffect(() => {
        const getWallets = async () => {
            return await fetchWallets();
        }
        getWallets().then(res => setWallets(res))
    }, [onSuccess, deleteTrigger]);
    useEffect(() => {
        selectedWalletAction(showSelectedWalletInfo)
        console.log("second",showSelectedWalletInfo)
    }, [wallets, showSelectedWalletInfo, selectedWalletAction]);

    return(
        <div className="flex flex-col gap-3 w-full bg-black/5 p-6 rounded-xl gap-5 border-1 border-black/10">
            <div className="flex w-full justify-between h-fit">
                <h1 className="text-2xl font-bold text-black/80">Wallets</h1>
                <AddWalletModal onSuccess={setOnSuccess}/>
            </div>
            <div className="flex w-full h-full">
                <WalletsList wallets={wallets} selectedWalletAction={setShowSelectedWalletInfo}/>
            </div>
        </div>

    );
}
export default WalletsListAndAddContainer;