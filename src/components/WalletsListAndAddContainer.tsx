"use client"
import React, {useEffect, useRef, useState} from "react";
import AddWalletModal from "@/components/AddWalletModal";
import {WalletsList} from "@/components/WalletsList";
import {Wallet} from "@/lib/types";
import {fetchWallets} from "@/lib/utils/fetchWallets";



const WalletsListAndAddContainer = () => {
    const [onSuccess, setOnSuccess] = useState<boolean>(false);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    useEffect(() => {
        const getWallets = async () => {
            return await fetchWallets();
        }
        getWallets().then(res => setWallets(res))
    }, [onSuccess]);

    return(
        <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex w-full justify-between h-fit">
                <h1 className="text-2xl font-bold text-black/80">Wallets</h1>
                <AddWalletModal onSuccess={setOnSuccess}/>
            </div>
            <div className="flex w-full h-full">
                <WalletsList wallets={wallets}/>
            </div>
        </div>

    );
}
export default WalletsListAndAddContainer;