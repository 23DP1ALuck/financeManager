import {boolean} from "zod";
import {WALLETS} from "@/generated/prisma";

export const INPUTS_REGISTRATION : {label: string, forLabel: string, name: string, type: string, placeholder: string}[] = [
    {"label" : "Username", "forLabel" : "username", "name" : "username", "type": "text", "placeholder": "Username :"},
    {"label" : "Password", "forLabel" : "password", "name" : "password", "type": "password", "placeholder": "Password :"},
    {"label" : "Email", "forLabel" : "email", "name" : "email", "type": "email", "placeholder": "Email :"},
]
export const INPUTS_LOGIN : {label: string, forLabel: string, name: string, type: string, placeholder: string}[] = [
    {"label" : "Username", "forLabel" : "username", "name" : "username", "type": "text", "placeholder": "Username :"},
    {"label" : "Password", "forLabel" : "password", "name" : "password", "type": "password", "placeholder": "Password :"},
]
export const sections : { section : string, sectionName : string, href : string}[] = [
    {"section" : "overview", "sectionName" : "Overview", "href" : "/overview"},
    {"section" : "wallets", "sectionName" : "Wallets", "href" : "/wallets"},
    {"section" : "budgets", "sectionName" : "Budgets", "href" : "/budgets"},
    {"section" : "transactions", "sectionName" : "Transactions", "href" : "/transactions"},
]