import Arrow from "@/components/icons/Arrow";
import Burger from "@/components/icons/Burger";
import Car from "@/components/icons/Car";
import Puzzle from "@/components/icons/Puzzle";

const BudgetBlock = () => {
    return(
        <div className="flex flex-col bg-black/5 w-full max-w-md rounded-2xl gap-1 p-2 border-1 border-black/10">
            <h1 className="font-base font-semibold text-black/90">
                Budget progress
            </h1>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex w-5"><Burger className="size-4 text-black/90"/></div>
                    <h2 className="font-semibold text-xs text-black/90">Food: €120 / €150 </h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex w-5"><Car className="size-4 text-black/90"/></div>
                    <h2 className="font-semibold text-xs text-black/90">Transport: €85 / €50 </h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex w-5"><Puzzle className="size-4 text-black/90"/></div>
                    <h2 className="font-semibold text-xs text-black/90">Entertainment: €120 / €150 </h2>
                </div>
            </div>
        </div>
    );
}
export default BudgetBlock;