import Header from "@/components/shared/Header";
import Overview from "@/components/overviewComponents/Overview";
import { getServerSession } from "next-auth/next";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/utils/authOptions";
import {sections} from "@/app/constants";



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
    return (
        <>
            <Header sections={sections}/>
            <Overview {...userInfo}/>
        </>
    );
}
