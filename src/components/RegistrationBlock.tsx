import Facebook from "@/components/icons/Facebook";
import Twitter from "@/components/icons/Twitter";
import Google from "@/components/icons/Google";
import OrBlock from "@/components/OrBlock";

type RegistrationProps = {
    inputs : {
        label : string,
        forLabel  : string,
        name : string,
        type: string,
        placeholder: string
    }[]
};

const RegistrationBlock = ({inputs} : RegistrationProps) => {
    return(
      <div className="flex items-center flex-col gap-3 max-w-100 p-4 bg-white rounded-3xl border border-white/20">
          <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-black">Create your account</h1>
              <p className="text-sm text-black/70">Let's get started. Fill in the details below to create your account.</p>
          </div>
          <div className="flex flex-col w-full gap-3">
              <form className="flex flex-col gap-3">
                  {inputs.map(({label, forLabel, name, type, placeholder}) => (
                      <div key={label} className="flex flex-col w-full rounded-xl">
                          <label htmlFor={forLabel} className="text-black text-sm font-semibold p-1">{label}</label>
                          <input
                              className="w-full bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:border placeholder:text-black/70 font-medium text-black/90 text-xs p-2 border border-black/20 rounded "
                              placeholder={placeholder} type={type} id={name} name={name}/>
                      </div>
                  ))}
                  <button type="submit"
                          className="flex items-center justify-center w-full p-2 bg-black text-center font-bold text-white/90 rounded-xl opacity-80 cursor-pointer hover:opacity-90 duration-400">
                      Register
                  </button>
              </form>
              <OrBlock/>
              <div className="flex w-full items-center justify-center">
                  <div className="grid grid-cols-3 w-full gap-4 px-2">
                      <div className="flex justify-center">
                          <div className="flex w-fit p-1 border border-black/20 rounded-xl px-10 hover:bg-black/5 duration-200 cursor-pointer"><Facebook
                              className="text-black/80 duration-200 size-7 cursor-pointer"/></div>
                      </div>
                      <div className="flex justify-center"><div className="flex w-fit p-1 border border-black/20 rounded-xl px-10 hover:bg-black/5 duration-200 cursor-pointer"><Twitter className="text-black/80  duration-200 size-7 cursor-pointer"/></div></div>
                      <div className="flex justify-center"><div className="flex w-fit p-1 border border-black/20 rounded-xl px-10 hover:bg-black/5 duration-200 cursor-pointer"><Google className="text-black/80 duration-200 size-7 cursor-pointer"/></div></div>
                  </div>
              </div>
              </div>
      </div>
    );
}

export default RegistrationBlock;