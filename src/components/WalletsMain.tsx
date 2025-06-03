import {SideBar} from "@/components/SideBar";
import Image from 'next/image'
import {Wallets} from "@/components/Wallets";

const WalletsMain = () => {
    return(
        <div className="flex w-full sm:px-7 px-1 bg-[#00FFFF04]">
            <div className="flex md:px-6.5 py-16 flex-col px-2 h-full w-fit">
                <SideBar/>
            </div>
            <div className="flex w-full h-auto px-2">
                <div className="flex flex-col w-1/2 bg-black/5 p-6 rounded-xl">
                    <div className="flex w-full justify-between h-fit">
                        <h1 className="text-2xl font-bold text-black/80">Wallets</h1>
                        <div className="flex bg-[#7EF9D28b] text-black/90 rounded-full p-1 items-center cursor-pointer">
                            <div className="flex bg-white rounded-full h-6 w-6 items-center justify-center">
                                +
                            </div>
                            <h1 className="text-black/90 font-semibold px-2">Add wallet</h1>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <Wallets/>
                    </div>
                </div>
                <div className="flex w-1/2 h-auto">

                </div>
            </div>
        </div>
    )
}
export default WalletsMain;