"use client"
import Logo from "@/components/icons/Logo";
import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/RegistrationBlock";
import LoginBlock from "@/components/LoginBlock";
import {useEffect} from "react";
import {INPUTS_LOGIN} from "@/app/constants";

export default function Login(){
    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((json) => console.log(json))
            },[])

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