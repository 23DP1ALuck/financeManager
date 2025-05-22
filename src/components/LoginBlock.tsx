import Facebook from "@/components/icons/Facebook";
import Twitter from "@/components/icons/Twitter";
import Google from "@/components/icons/Google";

const LoginBlock = () => {
    return(
        <div className="flex items-center flex-col gap-3 w-fit p-4 bg-black/50 rounded-3xl">
            <div className="flex">
                <h1 className="font-bold text-xl text-white">Login to your account</h1>
            </div>
            <div className="flex flex-col w-full gap-3">
                <form className="flex flex-col gap-5">
                    <div className="flex w-full bg-black/55 rounded-xl">
                        <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2" placeholder="Username: " type="text" id="username" name="username"/>
                    </div>
                    <div className="flex w-full bg-black/55 rounded-xl">
                        <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2" placeholder="Password: " type="password" id="password" name="password"/>
                    </div>
                    <button type="submit" className="flex items-center justify-center w-full p-3 bg-white text-center font-bold text-black/90 rounded-xl opacity-80 hover:opacity-90 duration-400">
                        Login
                    </button>
                </form>
                <div className="flex flex-col items-center w-full gap-3 justify-center">
                    <h1 className="font-medium text-white/70 cursor-default text-sm">Or sign in with</h1>
                    <div className="grid grid-cols-3 w-full px-2">
                        <div className="flex justify-center">
                            <div className="flex w-fit p-1"><Facebook
                                className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex w-fit p-1"><Twitter
                                className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex w-fit p-1"><Google
                                className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBlock;