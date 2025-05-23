"use client"
import Home from "@/components/icons/Home";
import Info from "@/components/icons/Info";
import Settings from "@/components/icons/Settings";
import Logout from "@/components/icons/Logout";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export const SideBar = () => {
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(status ===  "unauthenticated"){
            router.push("/auth/login")
        }
        if (status === "loading") return null
    },[status])
    return (
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
                    className="flex rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-200 hover:bg-red-500/80" onClick={() => signOut({callbackUrl: "/auth/login"})}>
                    <Logout/>
                </div>
            </div>
        </div>
    );
}