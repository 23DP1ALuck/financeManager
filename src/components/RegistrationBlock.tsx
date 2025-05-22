import Facebook from "@/components/icons/Facebook";
import Twitter from "@/components/icons/Twitter";
import Google from "@/components/icons/Google";
const RegistrationBlock = () => {
    return(
      <div className="flex items-center flex-col gap-3 w-fit p-4 bg-white rounded-3xl border border-white/20">
          <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-black">Create your account</h1>
              <p className="text-sm text-black/70">Let's get started. Fill in the details below to create your account.</p>
          </div>
          <div className="flex flex-col w-full gap-3">
              <form className="flex flex-col gap-3">
                  <div className="flex flex-col w-full rounded-xl">
                      <label htmlFor="fullname" className="text-black text-sm font-semibold">Full name</label>
                      <input
                          className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-black/70 font-medium text-white text-xs p-2 border border-black/20 rounded "
                          placeholder="Full name: " type="text" id="nameSurname" name="nameSurname"/>
                  </div>
                  <div className="flex flex-col w-full rounded-xl">
                      <label htmlFor="fullname" className="text-black text-sm font-semibold">Full name</label>
                      <input
                          className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-black/70 font-medium text-white text-xs p-2 border border-black/20 rounded "
                          placeholder="Full name: " type="text" id="nameSurname" name="nameSurname"/>
                  </div>
                  <div className="flex flex-col w-full rounded-xl">
                      <label htmlFor="fullname" className="text-black text-sm font-semibold">Full name</label>
                      <input
                          className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-black/70 font-medium text-white text-xs p-2 border border-black/20 rounded "
                          placeholder="Full name: " type="text" id="nameSurname" name="nameSurname"/>
                  </div>
                  <div className="flex flex-col w-full rounded-xl">
                      <label htmlFor="fullname" className="text-black text-sm font-semibold">Full name</label>
                      <input
                          className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-black/70 font-medium text-white text-xs p-2 border border-black/20 rounded "
                          placeholder="Full name: " type="text" id="nameSurname" name="nameSurname"/>
                  </div>
                  <button type="submit"
                          className="flex items-center justify-center w-full p-2 bg-black text-center font-bold text-white/90 rounded-xl opacity-80 cursor-pointer hover:opacity-90 duration-400">
                      Register
                  </button>
              </form>
              <div className="flex w-full justify-center">
                  <h1 className="font-medium text-white/70 cursor-default text-sm">Or sign up with</h1>
              </div>
              <div className="grid grid-cols-3 px-2">
                  <div className="flex justify-center">
                      <div className="flex w-fit p-1"><Facebook
                          className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div>
                  </div>
                  <div className="flex justify-center"><div className="flex w-fit p-1"><Twitter className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div></div>
                  <div className="flex justify-center"><div className="flex w-fit p-1"><Google className="text-white/50 hover:text-white/75 duration-200 size-7 cursor-pointer"/></div></div>
                  </div>
              </div>
      </div>
    );
}

export default RegistrationBlock;