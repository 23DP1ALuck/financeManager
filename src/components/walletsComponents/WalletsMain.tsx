import {SideBar} from "@/components/SideBar";
import WalletsLeftAndRight from "@/components/walletsComponents/WalletsLeftAndRight";

const WalletsMain = async () => {
    // TODO : responsive
    return(
        <div className="flex w-full max-h-9/10 h-full sm:px-7 px-1 bg-[#00FFFF04]">
            <div className="flex md:px-6.5 py-16 flex-col px-2 h-full w-fit">
                <SideBar/>
            </div>
            <div className="flex flex-col py-5 h-full w-full">
                <WalletsLeftAndRight/>
            </div>
        </div>
    )
}
export default WalletsMain;