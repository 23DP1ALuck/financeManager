import Logo from "@/components/icons/Logo";
import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/RegistrationBlock";

export default function Login(){
    return (
        <main className="flex flex-col justify-center items-center w-full h-full bg-[#B1B1B1]">
            <div className="w-fit h-auto">
                <LogoForAuth/>
            </div>
            <div className="w-fit h-auto">
                <RegistrationBlock/>
            </div>
        </main>
    );
}