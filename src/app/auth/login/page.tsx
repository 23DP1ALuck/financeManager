import LogoForAuth from "@/components/icons/LogoForAuth";
import LoginBlock from "@/components/authBlocks/LoginBlock";
import {INPUTS_LOGIN} from "@/app/constants";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";
import {redirect} from "next/navigation";

export default async function Login(){
    // if have session redirect to overview
    const session = await getServerSession(authOptions);
    if(session){
        redirect("/overview")
    }
    return (<>
        <main className="flex flex-col justify-center items-center gap-4 w-full h-full bg-gray-200">
            <div className="w-fit h-auto">
                <LogoForAuth/>
            </div>
            <div className="w-fit h-auto">
                <LoginBlock inputs={INPUTS_LOGIN}/>
            </div>
        </main>
    </>)

}