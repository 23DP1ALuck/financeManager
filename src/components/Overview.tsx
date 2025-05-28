import IncomeExpensesBlock from "@/components/IncomeExpensesBlock";
import BudgetBlock from "@/components/BudgetBlock";
import BalanceBlock from "@/components/BalanceBlock";
import LastTransactions from "@/components/LastTransactions";
import {Component as CategoriesChart} from "@/components/CategoriesChart"
import {SideBar} from "@/components/SideBar";

type UserInfo = {
    name: string,
    email: string,
    image: string,
}

const Overview = (userInfo: UserInfo) => {
    return (
        <div className="flex w-full sm:px-7 px-1 bg-[#00FFFF04]">
            <div className="flex md:px-6.5 py-16 flex-col w-1/8 px-2 h-full w-fit">
                <SideBar/>
            </div>
            <div className="flex flex-col py-17 gap-7 px-2 md:px-3 w-full h-full">
                <div className="flex flex-col gap-2 w-fit">
                    <h1 className="text-xl md:text-3xl font-semibold text-black">Welcome back, {userInfo.name}</h1>
                    <p className="text-black/50 font-medium text-xs md:text-sm">Here you can check your monthly overview
                        report</p>
                </div>
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="flex gap-3 w-full md:w-1/2">
                        <IncomeExpensesBlock/>
                        <BudgetBlock/>
                    </div>
                    <div className="flex w-full md:w-1/2">
                        <BalanceBlock/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 h-full">
                    <div className="flex md:w-1/2 w-full h-auto">
                        <LastTransactions/>
                    </div>
                    <div className="flex md:w-1/2 w-full justify-center h-auto">
                        <CategoriesChart/>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Overview;