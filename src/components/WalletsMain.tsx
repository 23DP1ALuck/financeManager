import {SideBar} from "@/components/SideBar";
import WalletsListAndAddContainer from "@/components/WalletsListAndAddContainer";

const WalletsMain = async () => {
    return(
        <div className="flex w-full sm:px-7 px-1 bg-[#00FFFF04]">
            <div className="flex md:px-6.5 py-16 flex-col px-2 h-full w-fit">
                <SideBar/>
            </div>
            <div className="flex w-full h-auto px-2">
                <div className="flex flex-col w-1/2 bg-black/5 p-6 rounded-xl gap-5">
                    <WalletsListAndAddContainer/>
                </div>
                <div className="flex w-1/2 h-auto">
                </div>
            </div>
        </div>
    )
}
export default WalletsMain;