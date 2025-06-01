import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/RegistrationBlock";
import {INPUTS_REGISTRATION} from "@/app/constants";

export default function Registration(){
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