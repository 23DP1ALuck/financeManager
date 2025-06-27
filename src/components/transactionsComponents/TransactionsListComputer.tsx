"use client"
import {Transactions} from "@/lib/types";
import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import Food from "@/components/icons/Food";
import {HandCoins as Other, SquarePlay as Entertainment} from "lucide-react";
import Transport from "@/components/icons/Transport";
import Education from "@/components/icons/Education";
import Subscriptions from "@/components/icons/Subscriptions";
import AddTransaction from "@/components/transactionsComponents/AddTransaction";
import moment from "moment";
import {useState} from "react";

type TransactionsListComputerProps = {
    transactionsDays : Record<string, Transactions[]>
    setIsSelected : Dispatch<SetStateAction<Transactions | undefined | null>>
    isSelected : Transactions | undefined | null
    onSubmitAction: Dispatch<SetStateAction<boolean>>
    setShowToast: Dispatch<SetStateAction<boolean>>
}
const categoryImage : Record<number, ReactElement> = { // const for category images displaying
    1: <Food className={"size-4"}/>,
    2: <Entertainment className={"size-4"}/>,
    3: <Transport className={"size-4"}/>,
    4: <Education className={"size-4"}/>,
    5: <Other className={"size-4"}/>,
    6: <Subscriptions className={"size-4"}/>
}
const TransactionsListComputer = ({transactionsDays, setIsSelected, isSelected, onSubmitAction, setShowToast} : TransactionsListComputerProps) => {
    const[onSubmit, setOnSubmit] = useState<boolean>(false); // submit state
    useEffect(() => {
        onSubmitAction(onSubmit);
    }, [onSubmit]);
    return(
        <div className={`flex flex-col flex-1 overflow-y-auto justify-between`}><div className="flex flex-col h-9/10 overflow-y-auto">{ Object.keys(transactionsDays).map((date, index) => (
            <div key={index} className="flex flex-col gap-4 px-5 py-2.5 font-semibold text-black/50">
                <h1 className="text-sm font-semibold text-black/50 py-1.5">{moment(date).format("DD MMM YYYY")}</h1>
                {Object.values(transactionsDays[date]).map((transaction, index) => (
                    <div key={index}
                         className={`group flex justify-between gap-2 px-2 py-2.5 hover:bg-black/5 hover:duration-200 rounded-sm cursor-pointer ${isSelected?.transaction_id === transaction.transaction_id ? "bg-black/10 hover:bg-black/10" : "bg-transparent"}`}
                         onClick={() => setIsSelected(transaction)}>
                        <div className="flex gap-2.5 items-center">
                            <div className={`flex bg-black/3 p-2 rounded group-hover:bg-transparent ${isSelected?.transaction_id === transaction.transaction_id && "bg-transparent"}`}>{categoryImage[transaction.category.category_id]}</div>
                            <div className="flex flex-col gap-[5px]">
                                <h1 className="text-black/90 font-semibold text-xs">{transaction.transaction_name}</h1>
                                <h1 className="text-black/70 font-normal text-xs">{transaction.category.name}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <h1 className="text-red-500 text-xs">{transaction.category.name !== "Income" ? "-" : ""}&euro;{transaction.amount}</h1>
                            <h1 className="text-black/70 text-xs">{transaction.account?.account_id ? transaction.account.name : "Deleted wallet"}</h1>
                        </div>
                    </div>
                ))}
            </div>
        ))}</div>
            <div className="flex w-full justify-center">
                <AddTransaction onSubmitSuccess={setOnSubmit} showToast={setShowToast}/>
            </div>
        </div>)
}
export default TransactionsListComputer;