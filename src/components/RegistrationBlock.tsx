"use client"
import Google from "@/components/icons/Google";
import OrBlock from "@/components/OrBlock";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {AnimatePresence, motion} from "motion/react";
import Github from "@/components/icons/Github";

type RegistrationProps = {
    inputs : {
        label : string,
        forLabel  : string,
        name : string,
        type: string,
        placeholder: string
    }[]
};

const  RegistrationBlock = ({inputs} : RegistrationProps) => {
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: boolean}>({});
    const [errorMessage, setErrorMessageText] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // check for blank
        const email = formData.get("email")?.toString().trim();
        const username = formData.get("username")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        // if blank put into errors obj
        const errors: { [key: string]: boolean } = {};
        if (!email) errors.email = true;
        if (!password) errors.password = true;
        if(!username) errors.username = true;

        // if errors exists set errors in UI for 2sec
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setErrorMessageText("Missing field");
            setTimeout(() : void => {
                setFieldErrors({});
            },2000)
            return;
        }
        // if everything is fine fetch register api and tries to register user
        const res = await fetch("/api/register", {
            method: "POST",
            body: formData
        });
        const result = await res.json();
        if (result.success) router.push("/auth/login")
        else{
            setErrorMessageText(result.registrationError.message || "Unknown error");
            setTimeout(() : void => {
                setErrorMessageText(null);
            },2000)
        }

    }

    return(
        <div className="flex items-center flex-col gap-3">
      <div className="flex items-center flex-col gap-3 max-w-100 p-4 bg-white rounded-3xl border border-white/20">
          <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-black">Create your account</h1>
              <p className="text-sm text-black/70">Let's get started. Fill in the details below to create your account.</p>
          </div>
          <div className="flex flex-col w-full gap-3">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  {inputs.map(({label, forLabel, name, type, placeholder}) => (
                      <div key={label} className={`flex flex-col w-full rounded-xl relative ${fieldErrors[name] && "border-red-600/50"}`}>
                          <label htmlFor={forLabel} className="text-black text-sm font-semibold p-1">{label}</label>
                          <input
                              className={`w-full bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:border placeholder:text-black/70 font-medium text-black/90 text-xs p-2 border border-black/20 rounded ${fieldErrors[name] && "border-red-600/50"}`}
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
                  ))}
                  <button type="submit"
                          className="flex items-center justify-center w-full p-2 bg-black text-center font-bold text-white/90 rounded-xl opacity-80 cursor-pointer hover:opacity-90 duration-400">
                      Register
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
                  <h1 className="text-black/70 text-sm">Already have an account?</h1>
                  <Link className="text-black/80 text-sm underline" href="/auth/login">Sign in</Link>
              </div>
          </div>
      </div>
            <div className="flex flex-col h-5">
                {/*display existing user error*/}
                <AnimatePresence>
                    {errorMessage === "User already exists" && (
                        <motion.div
                            key="error-message"
                            initial={{ opacity: 0,}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            className="text-red-600 text-md font-medium text-center"
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default RegistrationBlock;