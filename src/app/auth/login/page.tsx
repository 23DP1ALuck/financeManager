import LogoForAuth from "@/components/icons/LogoForAuth";
import LoginBlock from "@/components/LoginBlock";
import {INPUTS_LOGIN} from "@/app/constants";

export default function Login(){

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