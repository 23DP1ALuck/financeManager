import Arrow from "@/components/icons/Arrow";
import Card from "@/components/icons/Card";

const BalanceBlock = () => {
    return (
        <div className="flex justify-center items-center gap-2 bg-black/5 w-full rounded-2xl p-1 border-1 border-black/10">
            <Card className="text-black/70 size-6"/>
            <h1 className="text-black/70 font-bold text-xl">
                Total balance: €1000,00
            </h1>
        </div>
    );
}
export default BalanceBlock;