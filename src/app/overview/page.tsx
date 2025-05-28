import Image from "next/image";
import Header from "@/components/Header";
import Overview from "@/components/Overview";
import { getServerSession } from "next-auth/next";
import {redirect} from "next/navigation";
import {getLastFourTransactions} from "@/lib/utils/getLastFourTransactions";
import { getToken } from "next-auth/jwt"
import {authOptions} from "@/lib/utils/authOptions";



export default async function OverviewPage() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/auth/login")
    }
    console.log(session);
    const userInfo : { user_id: number,name : string, email : string, image : string} = {
        user_id: session.user?.id ?? "",
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
