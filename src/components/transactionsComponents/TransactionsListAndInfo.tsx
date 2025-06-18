"use client"
import TransactionList from "@/components/transactionsComponents/TransactionList";
import TransactionInfo from "@/components/transactionsComponents/TransactionInfo";
import {useState} from "react";
import {Transactions} from "@/lib/types";

const TransactionsListAndInfo = () => {
    const [transactionInfo, setTransactionInfo] = useState<Transactions | undefined | null>(null);
    return(
        <div className="flex py-5 h-full w-full gap-5">
            <TransactionList setTransactionInfo={setTransactionInfo}/>
            <TransactionInfo transaction={transactionInfo}/>
        </div>
    );
}
export default TransactionsListAndInfo;