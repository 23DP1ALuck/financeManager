"use client"
import Filter from "@/components/icons/Filter";
import SortBy from "@/components/icons/SortBy";
import {ReactElement, useEffect, useState} from "react";
import {Transactions} from "@/lib/types";
import {LucideIcon, SquarePlay as Entertainment} from "lucide-react";
import Food from "@/components/icons/Food";
import Transport from "@/components/icons/Transport";
import Education from "@/components/icons/Education";
import Subscriptions from "@/components/icons/Subscriptions";
import Other from "@/components/icons/Other";
import moment from "moment/moment";

const TransactionList = () => {
    const [transactions, setTransactions] = useState<Transactions[]>([]);
    const categoryImage : Record<number, ReactElement> = {
        1: <Food/>,
        2: <Entertainment/>,
        3: <Transport/>,
        4: <Education/>,
        5: <Other/>,
        6: <Subscriptions/>
    }
    useEffect(() => {
        fetch('/api/transactions').then(res => res.json()).then(res => {
            console.log(res);
            setTransactions(res.data)
        })
    },[])
    const findTransactionsByDate = (transactions: Transactions[], date: Date): Transactions[] => {
        const out: Transactions[] = [];
        transactions.forEach((transaction) => {
            if(new Date(transaction.date).getFullYear() === new Date(date).getFullYear() &&
                new Date(transaction.date).getMonth() === new Date(date).getMonth() &&
                new Date(transaction.date).getDay() === new Date(date).getDay()) {
                out.push(transaction);
            }
        });
        return out;
    }
    const transactionsDays : Record<string, Transactions[]> = {
    }
    transactions.map((transaction) => {
        if(!transactionsDays[moment(transaction.date).format("MMM DD YYYY")]) transactionsDays[moment(transaction.date).format("MMM DD YYYY")] = findTransactionsByDate(transactions, transaction.date);
    });

    return(
      <div className="flex flex-col w-1/2 bg-white px-5 py-7 rounded-sm">
          <div className="flex w-full h-fit justify-between items-center px-5 py-1.5">
              <h1 className="text-lg font-semibold text-black/70">Transactions</h1>
              <div className="flex items-center gap-8">
                  <Filter className="size-3.5 cursor-pointer"/>
                  <SortBy className="size-3.5 cursor-pointer"/>
              </div>
          </div>
          {Object.keys(transactionsDays).map((date, index) => (
              <div key={index} className="flex flex-col gap-4 px-5 py-2.5 font-semibold text-black/50">
                  <h1 className="text-sm font-semibold text-black/50 py-1.5">{moment(date).format("DD MMM YYYY")}</h1>
                  {Object.values(transactionsDays[date]).map((transaction, index) => (
                      <div key={index} className="flex justify-between gap-2 px-2 py-2.5 ">
                          <div className="flex gap-2.5 items-center">
                              <div className="flex bg-black/3 p-2 rounded">{categoryImage[transaction.category.category_id]}</div>
                              <div className="flex flex-col gap-[5px]">
                                  <h1 className="text-black/90 font-semibold text-xs">{transaction.transaction_name}</h1>
                                  <h1 className="text-black/70 font-normal text-xs">{transaction.category.name}</h1>
                              </div>
                          </div>
                          <div className="flex flex-col items-end">
                              <h1 className="text-red-500 text-xs">-${transaction.amount}</h1>
                              <h1 className="text-black/70 text-xs">{transaction.account?.account_id ? transaction.account.name : "Deleted wallet"}</h1>
                          </div>
                      </div>
                  ))}
              </div>
          ))}
      </div>
    );
}
export default TransactionList;