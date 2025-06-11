import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/authBlocks/RegistrationBlock";
import {INPUTS_REGISTRATION} from "@/app/constants";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";
import {redirect} from "next/navigation";

export default async function Registration(){
    // if have session redirect to overview
    const session = await getServerSession(authOptions);
    if(session){
        redirect("/overview")
    }
    return (
        <main className="flex flex-col justify-center items-center gap-4 w-full h-full bg-gray-200">
            <div className="w-fit h-auto">
                <LogoForAuth/>
            </div>
            <div className="w-fit h-auto">
                <RegistrationBlock inputs={INPUTS_REGISTRATION}/>
            </div>
        </main>
    );
}