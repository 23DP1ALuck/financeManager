const LastTransactions = () => {
    return(
        <div className="flex w-full h-full">
            <div className="flex flex-col px-4 py-7 gap-7 w-full h-auto bg-black/5 rounded-2xl border-1 border-black/10">
                <div className="w-full">
                    <h1 className="font-bold text-black/90 text-2xl">Last 4 transactions</h1>
                </div>
                <div className="flex flex-col gap-5">
                    <div style={{ willChange: 'transform' }}
                        className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between ease-in-out hover:scale-102 duration-300 will-change: transform;">
                        <h1 className="text-black/90 font-semibold">1st May</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">Spotify</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">-6.99$</h1>
                    </div>
                    <div
                        style={{ willChange: 'transform' }}
                        className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between hover:scale-102 duration-300 will-change: transform;">
                        <h1 className="text-black/90 font-semibold">1st May</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">Spotify</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">-6.99$</h1>
                    </div>
                    <div
                        style={{ willChange: 'transform' }}
                        className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between hover:scale-102 duration-300 will-change: transform;">
                        <h1 className="text-black/90 font-semibold">1st May</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">Spotify</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">-6.99$</h1>
                    </div>
                    <div
                        style={{ willChange: 'transform' }}
                        className="flex h-15 items-center rounded-2xl p-2 bg-white/10 border-1 border-black/12 justify-between hover:scale-102 duration-300 will-change: transform;">
                        <h1 className="text-black/90 font-semibold">1st May</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">Spotify</h1>
                        <div className="flex rounded-full w-0.5 h-3 bg-black/30"></div>
                        <h1 className="text-black/90 font-semibold">-6.99$</h1>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default LastTransactions;