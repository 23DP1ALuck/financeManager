const RegistrationBlock = () => {
    return(
      <div className="flex items-center flex-col gap-3 w-fit p-4 bg-black/50 rounded-3xl">
          <div className="flex">
              <h1 className="font-bold text-xl text-white">Create your account</h1>
          </div>
          <div className="flex flex-col w-full gap-3">
              <form className="flex flex-col gap-3">
                  <div className="flex w-full bg-black/55 rounded-xl">
                      <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2 " placeholder="Full name: " type="text" id="nameSurname" name="nameSurname"/>
                  </div>
                  <div className="flex w-full bg-black/55 rounded-xl">
                      <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2" placeholder="Username: " type="text" id="username" name="username"/>
                  </div>
                  <div className="flex w-full bg-black/55 rounded-xl">
                      <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2" placeholder="Email" type="email" id="email" name="email"/>
                  </div>
                  <div className="flex w-full bg-black/55 rounded-xl">
                      <input className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none placeholder:text-white/50 font-semibold text-white text-xs p-2" placeholder="Password: " type="password" id="password" name="password"/>
                  </div>
                  <button type="submit" className="flex items-center justify-center w-full p-3 bg-white text-center font-bold text-black/90 rounded-xl opacity-80 hover:opacity-90 duration-400">
                      Register
                  </button>
                </form>
                <div className="flex w-full justify-center">
                    <h1 className="font-medium text-white/70 cursor-default text-sm">Or sign up with</h1>
                </div>
          </div>
      </div>
    );
}

export default RegistrationBlock;