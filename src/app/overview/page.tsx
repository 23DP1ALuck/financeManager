import Image from "next/image";
import Header from "@/components/Header";
import Overview from "@/components/Overview";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {getLastFourTransactions} from "@/lib/utils/getLastFourTransactions";
import { getToken } from "next-auth/jwt"



export default async function OverviewPage() {
    const session = await getServerSession();
    if(!session || !session.user){
        redirect("/auth/login")
    }
    console.log(session.user);
    const userInfo : { name : string, email : string, image : string} = {
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
        image: session.user?.image ?? ""
    };
    const sections : { section : string, sectionName : string, href : string}[] = [
        {"section" : "overview", "sectionName" : "Overview", "href" : "/overview"},
        {"section" : "wallets", "sectionName" : "Wallets", "href" : "/wallets"},
        {"section" : "budgets", "sectionName" : "Budgets", "href" : "/budgets"},
        {"section" : "transactions", "sectionName" : "Transactions", "href" : "/transactions"},
    ]
    return (
        <>
            <Header sections={sections}/>
            <Overview {...userInfo}/>
        </>
    );
}
