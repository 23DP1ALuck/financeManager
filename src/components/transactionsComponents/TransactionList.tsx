"use client"
import Filter from "@/components/icons/Filter";
import SortBy from "@/components/icons/SortBy";
import {ReactElement, useEffect, useRef, useState} from "react";
import {Filters, Transactions} from "@/lib/types";
import {SquarePlay as Entertainment} from "lucide-react";
import {HandCoins as Other} from "lucide-react";
import Food from "@/components/icons/Food";
import Transport from "@/components/icons/Transport";
import Education from "@/components/icons/Education";
import Subscriptions from "@/components/icons/Subscriptions";
import moment from "moment/moment";
import Loading from "@/components/shared/Loading";
import AddTransaction from "@/components/transactionsComponents/AddTransaction";
import {toast, Toaster} from "sonner";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FilterForm} from "@/components/transactionsComponents/FilterForm";
import {useIsLaptot} from "@/components/hooks/useIsLaptot";
import TransactionsListLaptop from "@/components/transactionsComponents/TransactionsListLaptop";
import TransactionsListComputer from "@/components/transactionsComponents/TransactionsListComputer";

type TransactionListProps = {
    setTransactionInfo : (transaction : Transactions) => void;
    onDelete : boolean;
}


const TransactionList = ({setTransactionInfo, onDelete} : TransactionListProps) => {
    const[isSelected, setIsSelected] = useState<Transactions | undefined | null>(); // selected transaction
    const[isLoading, setIsLoading] = useState<boolean>(true); // loading state
    const [transactions, setTransactions] = useState<Transactions[]>([]); // transactions array
    const[onSubmit, setOnSubmit] = useState<boolean>(false); // submit state
    const [overflow, setOverflow] = useState<boolean>(false); // overflow state
    const [showToast,setShowToast] = useState<boolean>(false); // toast state
    const [filter, setFilter] = useState<Filters | null>();
    const categoryImage : Record<number, ReactElement> = { // const for category images displaying
        1: <Food className={"size-4"}/>,
        2: <Entertainment className={"size-4"}/>,
        3: <Transport className={"size-4"}/>,
        4: <Education className={"size-4"}/>,
        5: <Other className={"size-4"}/>,
        6: <Subscriptions className={"size-4"}/>
    }
    // fetch transactions from api and set transactions array
    useEffect(() => {
        setIsLoading(true);
        fetch(url(), {method: "GET"}).then(res => res.json()).then(res => {
            console.log("huj", res)
            if(res.success){
                console.log(res);
                setTransactions(res.data)
            }
        }).catch(err => {
            console.error("Error occurred", err)
        }).finally(() => setIsLoading(false));
    },[onSubmit, filter, onDelete,]) // fetch transactions only when submit state is changed and on first render

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
        console.log("loading state →", isLoading);
    }, [isLoading]);
    useEffect(() => {
        if(showToast){
            toast.success("Transaction created successfully.")
            setTimeout(() => setShowToast(false), 1000);
        }

    }, [showToast]);
    useEffect(() => {
        console.log(url())
    }, [filter])
    const url = (): string => {
        if (filter) {
            const params = new URLSearchParams();
            if (filter.account) params.append("account", filter.account);
            if (filter.category) params.append("category", filter.category);
            if (filter.dateFrom) params.append("dateFrom", filter.dateFrom);
            if (filter.dateTo) params.append("dateTo", filter.dateTo);
            if (params.size > 0) {
                return `/api/transactions?${params.toString()}`;
            } else {
                return "/api/transactions"
            }
        }
        return "/api/transactions";
    }
    const isLaptop = useIsLaptot();
    const [detailedTransaction, setDetailedTransaction] = useState<Transactions | null>();
    useEffect(() => {
        console.log("detailed transaction", detailedTransaction)
    }, [detailedTransaction]);
    return(
      <div className="flex flex-col lg:w-1/2 w-full bg-white px-5 py-7 rounded-sm">
          <Toaster/>
          <div className="flex flex-col w-full">
              <div className="flex w-full h-fit justify-between px-5 py-1.5">
                  <h1 className="text-lg font-semibold text-black/70">Transactions</h1>
              </div>
              <div className="px-5">
                  <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                          <AccordionTrigger icon={true}>Filter</AccordionTrigger>
                          <AccordionContent>
                              <FilterForm filterOnSubmitAction={setFilter}/>
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Loading/>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full relative">
              <div className="flex flex-col justify-center items-center h-full text-center px-6 text-black/50">
                <svg
                  className="w-10 h-10 mb-4 text-black/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6h13M9 7h13m-6 6v6m-5 4H4a2 2 0 01-2-2V5a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="text-lg font-semibold">No transactions yet</h2>
                <p className="text-sm mt-1">
                  Once you add transactions, you&#39;ll see them here.
                </p>
              </div>
              <div className="flex absolute bottom-0 w-full justify-center pb-6">
                <div className="flex w-full justify-center">
                  <AddTransaction
                    onSubmitSuccess={setOnSubmit}
                    showToast={setShowToast}
                  />
                </div>
              </div>
            </div>
          ) : (
              isLaptop ? (
                  <TransactionsListLaptop transactionsDays={transactionsDays} onSubmitAction={setOnSubmit} setShowToast={setShowToast} />
              ) : (
                  <TransactionsListComputer
                      transactionsDays={transactionsDays}
                      setIsSelected={setIsSelected}
                      isSelected={isSelected}
                      onSubmitAction={setOnSubmit}
                      setShowToast={setShowToast}
                  />
              )
          )}
        </div>)}
export default TransactionList;