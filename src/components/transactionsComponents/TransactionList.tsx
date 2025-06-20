"use client"
import Filter from "@/components/icons/Filter";
import SortBy from "@/components/icons/SortBy";
import {ReactElement, useEffect, useRef, useState} from "react";
import {Transactions} from "@/lib/types";
import {SquarePlay as Entertainment} from "lucide-react";
import {HandCoins as Other} from "lucide-react";
import Food from "@/components/icons/Food";
import Transport from "@/components/icons/Transport";
import Education from "@/components/icons/Education";
import Subscriptions from "@/components/icons/Subscriptions";
import moment from "moment/moment";
import Loading from "@/components/Loading";
import AddTransaction from "@/components/transactionsComponents/AddTransaction";
import {useOverflow} from "@/hooks/useOverflow";

type TransactionListProps = {
    setTransactionInfo : (transaction : Transactions) => void;
}


const TransactionList = ({setTransactionInfo} : TransactionListProps) => {
    const[isSelected, setIsSelected] = useState<Transactions>(); // selected transaction
    const[isLoading, setIsLoading] = useState<boolean>(true); // loading state
    const [transactions, setTransactions] = useState<Transactions[]>([]); // transactions array
    const[onSubmit, setOnSubmit] = useState<boolean>(false); // submit state
    const [overflow, setOverflow] = useState<boolean>(false); // overflow state
    const categoryImage : Record<number, ReactElement> = { // const for category images displaying
        1: <Food/>,
        2: <Entertainment/>,
        3: <Transport/>,
        4: <Education/>,
        5: <Other/>,
        6: <Subscriptions/>
    }
    // fetch transactions from api and set transactions array
    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        fetch('/api/transactions', {method: "GET", signal: signal}).then(res => res.json()).then(res => {
            console.log(res);
            setTransactions(res.data)
        }).catch(err => {
            if (err.name === "AbortError"){
                console.log("Cancelled", err.message);
            }else{
                console.error("Undefined error occurred")
            }
        }).finally(() => setIsLoading(false));
        return () => {
            controller.abort();
        }
    },[onSubmit]) // fetch transactions only when submit state is changed and on first render

    const transactionsDays : Record<string, Transactions[]> = transactions.reduce((acc: Record<string, Transactions[]>, transaction : Transactions) => {
        const key = moment(transaction.date).format("YYYY-MM-DD"); // assign date as key
        if (!acc[key]) acc[key] = []; // if this key not exist add it
        acc[key].push(transaction); // push transaction to this key
        return acc;
    }, {});
    useEffect(() => {
        if(isSelected) setTransactionInfo(isSelected); // set transaction info when transaction is selected
    }, [isSelected, setTransactionInfo]);
    useEffect(() => {
        setIsSelected(transactions[0]); // by default last transaction is selected
    }, [transactions]);
    const transactionListContainerRef = useRef<HTMLDivElement| null>(null); //ref for scrollable/unscrollable transaction list

    const checkOverflow = (element: HTMLDivElement | null) => {
        if(element){
            return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth; //return true if element is overflowing
        }
    }

    useEffect(() => {
        const element = transactionListContainerRef.current;
        console.log("element", element)
        if(element){
            const isOverflowing : boolean | undefined = checkOverflow(element);
            if(isOverflowing) setOverflow(true); // set true if overflowing for UI purposes
            else setOverflow(false);
        }
    }, [transactions]);
    useEffect(() => {
        console.log("loading state",isLoading)
    }, [isLoading]);
    return(
      <div className="flex flex-col w-1/2 bg-white px-5 py-7 rounded-sm">
          <div className="flex w-full h-fit justify-between items-center px-5 py-1.5">
              <h1 className="text-lg font-semibold text-black/70">Transactions</h1>
              <div className="flex items-center gap-8">
                  <Filter className="size-3.5 cursor-pointer"/>
                  <SortBy className="size-3.5 cursor-pointer"/>
              </div>
          </div>
          {isLoading ? <div className="flex justify-center items-center w-full h-full"><Loading/></div> :
              (transactions.length === 0 ? <div className="flex justify-center items-center w-full h-full relative">
                      <div className="flex flex-col justify-center items-center h-full text-center px-6 text-black/50">
                          <svg className="w-10 h-10 mb-4 text-black/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h13M9 7h13m-6 6v6m-5 4H4a2 2 0 01-2-2V5a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2z" />
                          </svg>
                          <h2 className="text-lg font-semibold">No transactions yet</h2>
                          <p className="text-sm mt-1">Once you add transactions, you&#39;ll see them here.</p>
                      </div>
                      <div className="flex absolute bottom-0 w-full justify-center pb-6">
                          <div className="flex w-full justify-center">
                              <AddTransaction onSubmitSuccess={setOnSubmit}/>
                          </div>
                      </div>
                  </div> : <div className={`flex flex-col ${!overflow ? "justify-between": "gap-7"} h-full`}><div ref={transactionListContainerRef} className="flex flex-col h-9/10 overflow-y-auto">{ Object.keys(transactionsDays).map((date, index) => (
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
                      <AddTransaction onSubmitSuccess={setOnSubmit}/>
                  </div>
                  </div>
              )}

      </div>
    );
}
export default TransactionList;