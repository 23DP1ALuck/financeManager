"use client"
import Container from "./Container";
import Logo from "@/components/icons/Logo";
import {ReactElement} from "react";
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
        <Container>
            <div className="flex align-middle px-6 py-2.5 gap-9 w-full">
                <div className="flex align-center">
                    <Logo/>
                </div>
                <div className="flex align-center justify-between w-full">
                    <div className="flex justify-center items-center px-2.5 gap-2.5">
                        {sections.map(({section, sectionName, href}) => (
                            <Link className={`${pathname === href ? "bg-[#7EF9D28b] font-bold" : "bg-[#00000005] font-semibold duration-200 hover:bg-[#0000002b]"} p-2.5 rounded-3xl h-fit"`} key={section} href={href}>{sectionName}</Link>
                        ))}
                    </div>
                    <Mail/>
                    <div className="flex items-center justify-center">
                        <div className="flex justify-center items-center  gap-1 bg-[#00000005] border border-[#0000001b] rounded-3xl px-3 py-1">
                            <Search/>
                            <input className="focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none" type="search" placeholder="Search..."/>
                        </div>
                    </div>
                </div>
                    <div className="flex justify-center items-center gap-4 bg-[#ffffff3b] px-2 py-1 rounded-3xl">
                        <div className="rounded-full w-fit p-2 bg-[#00000015]"><Mail/></div>
                        <div className="rounded-full w-fit p-2 bg-[#00000015]"><Notifications/></div>
                        <div className="rounded-full w-fit p-2 bg-[#00000015]"><User/></div>
                    </div>
            </div>
        </Container>
    )
}
export default Header;