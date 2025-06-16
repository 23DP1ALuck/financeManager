import {SideBar} from "@/components/SideBar";
import TransactionList from "@/components/transactionsComponents/TransactionList";
const TransactionsMain = () => {
    return(
        <div className="flex w-full max-h-9/10 h-full sm:px-7 px-1 bg-gray-100">
            <div className="flex md:px-6.5 py-16 flex-col px-2 h-full w-fit">
                <SideBar/>
            </div>
            <div className="flex py-5 h-full w-full">
                <TransactionList/>
            </div>
        </div>
    )
}
export default TransactionsMain;