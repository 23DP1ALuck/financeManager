import Image from "next/image";
import Header from "@/components/Header";
import Overview from "@/components/Overview";

export default function Home() {
  const sections : { section : string, sectionName : string, href : string}[] = [
    {"section" : "overview", "sectionName" : "Overview", "href" : "/"},
    {"section" : "wallets", "sectionName" : "WalletsList", href : "/wallets"},
    {"section" : "budgets", "sectionName" : "Budgets", href : "/budgets"},
    {"section" : "transactions", "sectionName" : "Transactions", href : "/transactions"},
  ]
  return (
      <>
        <h1>Finance manager</h1>
      </>
  );
}
