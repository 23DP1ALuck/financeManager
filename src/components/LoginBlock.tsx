"use client"
import Twitter from "@/components/icons/Twitter";
import Google from "@/components/icons/Google";
import OrBlock from "@/components/OrBlock";
import {signIn, SignInResponse} from "next-auth/react";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Github from "@/components/icons/Github";
import {redirect, useRouter} from "next/navigation";
import {AnimatePresence, motion} from "motion/react"
import {Router} from "next/router";

type LoginProps = {
    inputs : {
        label : string,
        forLabel  : string,
        name : string,
        type: string,
        placeholder: string
    }[]
};


const LoginBlock = ({inputs} : LoginProps) => {
    // state which stores objects with problematic fields
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
    // error texts
    const [errorMessage, setErrorMessageText] = useState<string | null>(null);
    // for redirect purposes
    const router = useRouter();

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const credentials = {
            email : formData.get("username")?.toString().trim() || "",
            username : formData.get("username")?.toString().trim() || "",
            password : formData.get("password")?.toString().trim() || ""
        }
        // initialize error object for problematic inputs
        const errors: { [key: string]: boolean } = {};
        // if one of them is missed, add property to object
        if (!credentials.username) errors.username = true;
        if (!credentials.password) errors.password = true;
        // changing state for displaying it
        if(Object.keys(errors).length > 0){
            setFieldErrors(errors);
            setErrorMessageText("Missing field");
            setTimeout(() => {
                setFieldErrors({});
            },2000)
            return;
        }
        signIn("credentials", { ...credentials, redirect: false })
            .then((result : SignInResponse | undefined)=> {
                if (!result) {
                    return;
                }
                const { error, status, ok } : {error: string | null, status: number, ok: boolean} = result;
                if(ok){
                    router.push("/overview");
                }else{
                    setErrorMessageText("No such user!")
                    setTimeout(() => {
                        setErrorMessageText("");
                    },2000)
                }
            })
    }

    return(
        <div className="flex items-center flex-col gap-3 max-w-100 rounded-3xl border border-white/20">
            <div className="flex items-center flex-col gap-3 max-w-100  p-4 bg-white rounded-3xl border border-white/20">
            <div className="flex flex-col w-full">
                <h1 className="font-bold text-2xl text-black">Login to your account</h1>
                <p className="text-sm text-black/70">Fill in the details below to login to your account.</p>
            </div>
            <div className="flex flex-col w-full gap-3">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    {inputs.map(({label, forLabel, name, type, placeholder}) => (
                        <div key={label} className="flex flex-col w-full rounded-xl">
                            <div className="flex gap-1 items-center">
                                <label htmlFor={forLabel} className="text-black text-sm font-semibold p-1 flex">{label}</label>
                            </div>
                            <div
                                className={`w-full relative bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:border border border-black/20 rounded ${fieldErrors[name] && "border-red-600/50"}`}>
                                <input
                                    className={`w-full h-full p-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none placeholder:text-black/70 font-medium text-black/90 text-xs ${fieldErrors[name] && "border-red-600/50"}`}
                                    placeholder={placeholder} type={type} id={name} name={name}/>
                                <div className="absolute right-2 bottom-2">
                                    {/*display errors input errors*/}
                                    <AnimatePresence>
                                        {(fieldErrors[name] && errorMessage === "Missing field") && (
                                            <motion.div
                                                key={`error-${name}`}
                                                initial={{opacity: 0,}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                className="text-red-600/50 text-sm font-medium text-center"
                                            >
                                                Missing field
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                        </div>
                    ))}
                    <button type="submit"
                            className="flex items-center justify-center w-full p-2 bg-black text-center font-bold text-white/90 rounded-xl opacity-80 cursor-pointer hover:opacity-90 duration-400">
                        Login
                    </button>
                </form>
                <OrBlock/>
                <div className="flex w-full items-center justify-center">
                    <div className="flex justify-center w-full gap-1">
                        <div className="flex justify-center w-1/2">
                            <div className="flex w-full justify-center p-1 border border-black/20 rounded-xl hover:bg-black/5 duration-200 cursor-pointer" onClick={() => signIn("github", {callbackUrl: "/overview"})}><Github
                                className="text-black/80 size-7 cursor-pointer"/></div>
                        </div>
                        <div className="flex justify-center w-1/2"><div className="flex w-full justify-center p-1 border border-black/20 rounded-xl hover:bg-black/5 duration-200 cursor-pointer" onClick={() => signIn("google", {callbackUrl: "/overview"})}><Google className="text-black/80 duration-200 size-7 cursor-pointer" /></div></div>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-2">
                    <h1 className="text-black/70 text-sm">Don't have an account?</h1>
                    <Link className="text-black/80 text-sm underline" href="/auth/registration">Sign up</Link>
                </div>
            </div>
        </div>
            <div className="flex flex-col h-5">
                {/*display invalid credentials error*/}
                <AnimatePresence>
                    {errorMessage === "No such user!" && (
                        <motion.div
                            key="error-message"
                            initial={{ opacity: 0,}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            className="text-red-600 text-sm font-medium text-center"
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default LoginBlock;