"use client"
import Logo from "@/components/icons/Logo";
import LogoForAuth from "@/components/icons/LogoForAuth";
import RegistrationBlock from "@/components/RegistrationBlock";
import LoginBlock from "@/components/LoginBlock";
import {useEffect} from "react";


export default function Login(){
    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((json) => console.log(json))
            },[])

    return (<>
        <main className="flex flex-col justify-center items-center gap-4 w-full h-full bg-gray-300">
            <div className="w-fit h-auto">
                <LogoForAuth/>
            </div>
            <div className="w-fit h-auto">
                <LoginBlock/>
            </div>
        </main>
    </>)

}