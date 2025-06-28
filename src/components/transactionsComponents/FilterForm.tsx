"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {CATEGORIES} from "@/app/constants"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {FC, useEffect, useState} from "react";
import {Filters, Wallet} from "@/lib/types";
import Image from "next/image";
import moment from "moment";
import {useIsLaptot} from "@/components/hooks/useIsLaptot";

type Category = {
    category_id: number;
    name: string;
}

const FormSchema = z.object({
    categories: z.string().optional(),
    walletType: z.string().optional(),
    fromYear: z.string().optional(),
    fromMonth: z.string().optional(),
    toYear: z.string().optional(),
    toMonth: z.string().optional(),
})

type FilterFormProps = {
    filterOnSubmitAction: (values: Filters | null) => void;
}


export function FilterForm({filterOnSubmitAction}: FilterFormProps) {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    useEffect(() => {
        fetch("/api/wallets").then((res) => res.json()).then((res) => {
            console.log("fetched", res);
            setWallets(res);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    const lastTwentyYears: number[] = Array.from({length: 20}, (_, i) => new Date().getFullYear() - i)
    const months: string[] = moment.monthsShort()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            categories: "",
            walletType: "",
            fromYear: "",
            fromMonth: "",
            toYear: "",
            toMonth: "",
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const filters: Filters = {
            ...(data.fromYear && {dateFrom: `${data.fromYear}-${data.fromMonth ? moment().month(data.fromMonth).format("MM") : 1}-01`}),
            ...(data.toYear && {dateTo: `${data.toYear}-${data.toMonth ? moment().month(data.toMonth).format("MM") : 1}-01`}),
            ...(data.categories && {category: data.categories}),
            ...(data.walletType && {account: data.walletType}),
        }
        filterOnSubmitAction(filters);
    }

    const toMonthWatcher = form.watch("toMonth");
    const toYearWatcher = form.watch("toYear")
    useEffect(() => {
        console.log("toMonthWatcher", toMonthWatcher);
        console.log("toYearWatcher", toYearWatcher);
    }, [toMonthWatcher]);
    useEffect(() => {
        console.log("toYearWatcher", toYearWatcher);
    }, [toYearWatcher]);
    const SelectMonthLabel : FC = () => {
        if(form.watch("fromYear") === "" && form.watch("fromMonth") !== ""){
            return <div className="flex w-full text-red-500">Year is required when a month is selected</div>
        }
        if(form.watch("fromYear") === undefined && form.watch("fromMonth") !== undefined){
            return <div className="flex w-full text-red-500">Year is required when a month is selected</div>
        }
        if(form.watch("toYear") === "" && form.watch("toMonth") !== ""){
            return <div className="flex w-full text-red-500">Year is required when a month is selected</div>
        }
        if(form.watch("toYear") === undefined && form.watch("toMonth") !== undefined){
            return <div className="flex w-full text-red-500">Year is required when a month is selected</div>
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4 w-1/2">
                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-3/4 lg:w-1/2">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((category : Category) => (
                                                    <SelectItem value={`${category.category_id}`} key={category.category_id}>
                                                        <div className="flex items-center gap-2">
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="walletType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wallet</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-3/4 lg:w-1/2">
                                                <SelectValue placeholder="Select wallet type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {wallets?.map((wallet : Wallet) => (
                                                    <SelectItem value={`${wallet.account_id}`} key={wallet.account_id}>
                                                        <div className="flex items-center gap-2">
                                                            <Image src={`/${wallet.name.toUpperCase()}.png`} alt={`${wallet.name} Icon`} width={20} height={20}/>
                                                            {wallet.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col w-1/2 items-end gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <FormLabel>From</FormLabel>
                            <div className="flex w-full gap-2">
                                <FormField
                                    control={form.control}
                                    name="fromYear"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <div>
                                                            {lastTwentyYears.map(elem => (
                                                                <SelectItem value={`${elem}`} key={elem}>
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        {elem}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                            {/*{form.watch("fromYear") === undefined && form.watch("fromMonth") !== undefined && <div className="flex">Year is required when a month is selected</div>}*/}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fromMonth"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <div>
                                                            {months.map(elem => (
                                                                <SelectItem value={`${elem}`} key={elem}>
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        {elem}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <FormLabel>To</FormLabel>
                            <div className="flex w-full gap-2">
                                <FormField
                                    control={form.control}
                                    name="toYear"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <div>
                                                            {lastTwentyYears.map(elem => (
                                                                <SelectItem value={`${elem}`} key={elem}>
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        {elem}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="toMonth"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <div>
                                                            {months.map(elem => (
                                                                <SelectItem value={`${elem}`} key={elem}>
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        {elem}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <SelectMonthLabel/>
                        </div>
                    </div>

                </div>
                <div className="flex w-full justify-between">
                    <Button className="w-1/4" type="submit">Search</Button> {/* TODO: disable when please select year also selected (in server also */}
                    <Button className="w-1/4 bg-red-500 hover:bg-red-600 duration-150" type="reset" onClick={() => {
                        form.reset({
                            categories: "",
                            walletType: "",
                            fromYear: undefined,
                            fromMonth: undefined,
                            toYear: undefined,
                            toMonth: undefined,
                        })
                        toast.success("Reset filters")
                        filterOnSubmitAction(null);
                    }}>Reset</Button>
                </div>
            </form>
        </Form>
    )
}