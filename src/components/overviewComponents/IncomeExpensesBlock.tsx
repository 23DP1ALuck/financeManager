import Arrow from "@/components/icons/Arrow";

const IncomeExpensesBlock = () => {
    return(
        <div className="flex bg-black/5 w-full max-w-md rounded-2xl p-1 border-1 border-black/10">
            <div className="flex flex-col justify-between py-2 px-2">
                <div className="flex gap-1 items-center">
                    <Arrow className="size-3 rotate-180 text-black/90"/>
                    <h2 className="font-semibold text-base text-black/90">Income this month: €595,55</h2>
                </div>
                <div className="flex gap-1 items-center">
                    <Arrow className="size-3 text-black/90"/>
                    <h2 className="font-semibold text-base text-black/90">Expenses this month: €595,55</h2>
                </div>

            </div>
        </div>
    );
}
export default IncomeExpensesBlock;