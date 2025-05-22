import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/RegistrationBlock";

export default function Registration(){
    return (
        <main className="flex flex-col justify-center items-center gap-4 w-full h-full bg-gray-300">
            <div className="w-fit h-auto">
                <LogoForAuth/>
            </div>
            <div className="w-fit h-auto border border-black/10 rounded-3xl">
                <RegistrationBlock/>
            </div>
        </main>
    );
}