import {sections} from "@/app/constants";
import Header from "@/components/Header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/utils/authOptions";
import {redirect} from "next/navigation";

export default async function Budgets(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/auth/login")
    }
    return<>
        <Header sections={sections}/>
    </>
}