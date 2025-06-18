"use client"
import Logo from "@/components/icons/Logo";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import Search from "@/components/icons/Search";
import Mail from "@/components/icons/Mail";
import Notifications from "@/components/icons/Notifications";
import User from "@/components/icons/User";

type HeaderProps = {
    sections: {
        section: string;
        sectionName: string;
        href: string;
    }[]
};

const Header = ({sections} : HeaderProps) => {
    const pathname = usePathname();
    return (
        <div className="flex justify-between w-full sm:px-7 px-2 py-1 bg-gray-100">
            <div>
                <div className="flex items-center py-2.5 gap-9 md:px-6 md:gap-4 w-full">
                    <div className="flex items-center shrink-0">
                        <Logo/>
                    </div>
                    <div className="fle"></div>
                    <div className="flex align-center justify-between w-full">
                        <div className="hidden sm:flex justify-center items-center px-2.5 gap-2.5">
                            {sections.map(({section, sectionName, href}) => (
                                <Link
                                    className={`${pathname === href ? "bg-[#7EF9D28b] font-bold" : "bg-[#00000005] font-semibold duration-200 hover:bg-[#0000002b]"} p-2.5 rounded-3xl h-fit"`}
                                    key={section} href={href}>{sectionName}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <div
                    className="hidden lg:flex items-center gap-1 bg-[#00000005] border border-[#0000001b] rounded-3xl max-w-xs w-full px-3 py-1">
                    <Search/>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none"
                    />
                </div>
                <div className="flex justify-center items-center gap-4 bg-[#ffffff3b] px-2 py-1 rounded-3xl">
                    <div
                        className="rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-150 hover:bg-[#0000002b]">
                        <Mail/></div>
                    <div
                        className="rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-150 hover:bg-[#0000002b]">
                        <Notifications/></div>
                    <div
                        className="rounded-full cursor-pointer w-fit p-2 bg-[#00000010] duration-150 hover:bg-[#0000002b]">
                        <User/></div>
                </div>
            </div>
        </div>
    )
}
export default Header;