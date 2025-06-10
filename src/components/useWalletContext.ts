import {createContext, useContext} from "react";

export type WalletContext = {
    onDeleteWalletAction : boolean
}

export const WalletContext = createContext<WalletContext>({
    onDeleteWalletAction : false
})

export const useWalletContext = () => {
    const context = useContext(WalletContext)
    if(context === undefined){
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
}
