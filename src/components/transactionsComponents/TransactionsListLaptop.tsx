import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { Transactions } from "@/lib/types";
import moment from "moment";
import {ReactElement, useEffect, useState} from "react";
import Food from "@/components/icons/Food";
import {HandCoins as Other, SquarePlay as Entertainment} from "lucide-react";
import Transport from "@/components/icons/Transport";
import Education from "@/components/icons/Education";
import Subscriptions from "@/components/icons/Subscriptions";
import AddTransaction from "@/components/transactionsComponents/AddTransaction";
import {Dispatch, SetStateAction} from "react";

type TransactionsListLaptopProps = {
    transactionsDays : Record<string, Transactions[]>
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

const TransactionsListLaptop = ({transactionsDays, onSubmitAction, setShowToast} : TransactionsListLaptopProps) => {
    const[onSubmit, setOnSubmit] = useState<boolean>(false); // submit state
    useEffect(() => {
        onSubmitAction(onSubmit);
    }, [onSubmit]);
    const [detaiedTransaction, setDetailedTransaction] = useState<Transactions | null>();
    return(
        <div className="flex flex-col flex-1 min-h-0 gap-2">
            <div className="flex-1 overflow-y-auto">
                <Accordion type={"single"} collapsible onValueChange={(value) => {
                    if(value === ""){
                        setDetailedTransaction(null);
                    }
                }}>
                    <div className={`flex flex-col flex-1 justify-between`}><div className="flex flex-col h-fit">{ Object.keys(transactionsDays).map((date, index) => (
                        <div key={index} className="flex flex-col gap-4 px-5 py-2.5 font-semibold text-black/50">
                            <h1 className="text-sm font-semibold text-black/50 py-1.5">{moment(date).format("DD MMM YYYY")}</h1>
                            {Object.values(transactionsDays[date]).map((transaction, index) => (
                                <AccordionItem className={`${detaiedTransaction?.transaction_id === transaction.transaction_id ? "bg-black/5 " : "bg-transparent"} transition-colors rounded-sm duration-200`} key={index} value={transaction.transaction_id.toString()}>
                                    <AccordionTrigger icon={false} onClick={() => setDetailedTransaction(transaction)}>
                                        <div
                                            className={`group w-full flex justify-between gap-2 px-2 py-2.5 rounded-sm`}>
                                            <div className="flex gap-2.5 items-center">
                                                <div className={`flex p-2 transition-colors duration-200 rounded`}>{categoryImage[transaction.category.category_id]}</div>
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
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className={`flex flex-col justify-between w-full h-full`}>
                                            <div className="flex flex-col gap-2 px-8 py-2">
                                                <div className="flex justify-between">
                                                    <span className="w-28 font-medium text-base text-black/90">Description:</span>
                                                    <span className="text-black/80">{transaction?.transaction_description}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="w-28 font-medium text-base text-black/90">Wallet:</span>
                                                    <span className="text-black/80">{transaction?.account ? transaction.account.name : "Deleted wallet"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="w-28 font-medium text-base text-black/90">Date:</span>
                                                    <span className="text-black/80">{moment(transaction?.date).format("MMM DD YYYY")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </div>
                    ))}
                    </div></div>
                </Accordion>
            </div>
            <div className="flex w-full justify-center">
                <AddTransaction onSubmitSuccess={setOnSubmit} showToast={setShowToast}/>
            </div>
        </div>

    );
}
export default TransactionsListLaptop;