"use client"
import TransactionList from "@/components/transactionsComponents/TransactionList";
import TransactionInfo from "@/components/transactionsComponents/TransactionInfo";
import {useState} from "react";
import {Transactions} from "@/lib/types";

const TransactionsListAndInfo = () => {
    const [transactionInfo, setTransactionInfo] = useState<Transactions | undefined | null>(null);
    const [onDelete, setOnDelete] = useState<boolean>(false);
    return(
        <div className="flex py-5 h-full w-full gap-5">
            <TransactionList setTransactionInfo={setTransactionInfo} onDelete={onDelete}/>
            <TransactionInfo transaction={transactionInfo} onDeleteInfo={setOnDelete}/>
        </div>
    );
}
export default TransactionsListAndInfo;