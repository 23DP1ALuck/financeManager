import Header from "@/components/Header";
import {sections} from "@/app/constants";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/utils/authOptions";
import {redirect} from "next/navigation";

export default async function Transactions(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/auth/login");
    }
    return<>
        <Header sections={sections}/>
    </>
}