"use client"
import {Transactions} from "@/lib/types";
import {useEffect, useState} from "react";
import moment from "moment";


type TransactionInfoProps = {
    transaction : Transactions | undefined | null,
}
const TransactionInfo = ({transaction} : TransactionInfoProps) => {
    const [transactionsExists, setTransactionsExists] = useState<boolean>(false);
    useEffect(() => {
        console.log("test", transaction);
        if(transaction) setTransactionsExists(true);
    }, [transaction])
    return(
        <div className="flex flex-col gap-5 w-1/2 bg-white px-5 py-7 rounded-sm h-3/4">
            <h1 className="font-semibold text-2xl text-black/70 px-5 py-1">Transaction details</h1>
            {transactionsExists ?
                <div className="flex flex-col gap-2 px-8 py-2">
                    <div className="flex gap-2">
                        <span className="w-28 font-medium text-base text-black/90">Name:</span>
                        <span className="text-black/80">{transaction?.transaction_name}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-28 font-medium text-base text-black/90">Description:</span>
                        <span className="text-black/80">{transaction?.transaction_description}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-28 font-medium text-base text-black/90">Category:</span>
                        <span className="text-black/80">{transaction?.category.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-28 font-medium text-base text-black/90">Wallet:</span>
                        <span className="text-black/80">{transaction?.account ? transaction.account.name : "Deleted wallet"}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-28 font-medium text-base text-black/90">Date:</span>
                        <span className="text-black/80">{moment(transaction?.date).format("MMM DD YYYY")}</span>
                    </div>
                </div> : <div className="flex flex-col justify-center items-center h-full text-center px-6 text-black/50">
                <svg className="w-10 h-10 mb-4 text-black/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 7h13m-6 6v6m-5 4H4a2 2 0 01-2-2V5a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-lg font-semibold">No transactions yet</h2>
                <p className="text-sm mt-1">Once you add transactions, you&#39;ll see their details here.</p>
            </div>}

        </div>
    )
}
export default TransactionInfo;