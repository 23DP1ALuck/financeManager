"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl,FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Wallet} from "@/lib/types";


// type OnSuccessProp = Dispatch<SetStateAction<boolean>>;

const getWallets = async () => {
    const res = await fetch("/api/wallets");
    return await res.json();
}

const AddTransaction = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/api/wallets").then((res) => res.json()).then((res) => {
            console.log("fetcheed", res);
            setWallets(res);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const formSchema = z.object({
        name: z.string().nonempty({
            message : "Name is required"
        }),
        description: z.string().max(100, {
            message: "Description must be less than 100 characters",
        }),
        amount: z.number().min(0, {
            message: "Amount must be greater than 0",
        }),
        walletType: z.string().nonempty({
            message: "Wallet type is required",
        }),
        category: z.string().nonempty({
            message: "Category type is required",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            walletType: "Other",
            amount: "" as unknown as number,
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const res = await fetch("api/wallets", {
                method: "POST",
                body: JSON.stringify(values)
            })
            const result = await res.json();
            console.log(result);
            if (result.success) form.reset();
        }catch (e) {
            console.log(e)
            return
        }
        setOpen(false)

    }
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger> <div
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span className="font-medium">Add transaction</span>
            </div></DialogTrigger>
            <DialogContent className="max-w-md w-[400px] gap-3">

                <DialogHeader>
                    <DialogTitle>Enter the details</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter description" {...field} />
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
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select wallet type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/*{wallets?.map((wallet) => (*/}
                                                {/*    <SelectItem value={wallet.name} key={wallet.account_id}>*/}
                                                {/*        <div className="flex items-center gap-2">*/}
                                                {/*            {wallet.name}*/}
                                                {/*            /!*<Image src={`${wallet.name.toUpperCase()}.png`} alt={`${wallet.name} Icon`} width={20} height={20}*!/*/}
                                                {/*            /!*       className="object-contain"/>*!/*/}
                                                {/*        </div>*/}
                                                {/*    </SelectItem>*/}
                                                {/*))}*/}
                                                {wallets?.map((wallet : Wallet) => (
                                                    <SelectItem value={`${wallet.account_id}`} key={wallet.account_id}>
                                                        <div className="flex items-center gap-2">
                                                            {wallet.name}
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
                            name={"amount"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Balance</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter balance"
                                            {...field}
                                            onChange={e => field.onChange(+e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTransaction;