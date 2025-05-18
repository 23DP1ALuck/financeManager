import Mail from "@/components/icons/Mail";
import Notifications from "@/components/icons/Notifications";
import User from "@/components/icons/User";
import Home from "@/components/icons/Home";
import Logout from "@/components/icons/Logout";
import Settings from "@/components/icons/Settings";
import Info from "@/components/icons/Info";
import IncomeExpensesBlock from "@/components/IncomeExpensesBlock";
import BudgetBlock from "@/components/BudgetBlock";
import BalanceBlock from "@/components/BalanceBlock";
import LastTransactions from "@/components/LastTransactions";
import {Component as CategoriesChart} from "@/components/CategoriesChart"

const Overview = () => {
    return(
        <div className="flex w-full sm:px-7 px-1 bg-[#00FFFF04]">
            <div className="flex md:px-6.5 py-16 flex-col w-1/8 px-2 h-full w-fit">
                <div className="flex flex-col py-1 px-1 w-fit bg-white rounded-3xl border-1 border-black/10">
                    <div className="flex flex-col items-center gap-5">
                        <div className="flex rounded-full text-white w-fit p-2 bg-black/80 duration-150">
                            <Home/>
                        </div>
                        {/*hr*/}
                        <div className="flex rounded-full w-3/4 h-0.5 bg-black/30"></div>
                    </div>
                    <div className="flex flex-col gap-12 pt-5">
                        <div
                            className="flex rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-200 hover:bg-[#0000002b]">
                            <Info/></div>
                        <div
                            className="flex rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-200 hover:bg-[#0000002b]">
                            <Settings/></div>
                        <div
                            className="flex rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-200 hover:bg-red-500/80">
                            <Logout/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-17 gap-7 px-2 md:px-3 w-full h-full">
                <div className="flex flex-col gap-2 w-fit">
                    <h1 className="text-xl md:text-3xl font-semibold text-black">Welcome back, Artjoms!</h1>
                    <p className="text-black/50 font-medium text-xs md:text-sm">Here you can check your monthly overview report</p>
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