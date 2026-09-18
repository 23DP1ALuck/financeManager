"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl,FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Wallet} from "@/lib/types";
import {CATEGORIES} from "@/app/constants";
import {toast} from "sonner";
type Category = {
    category_id: number;
    name: string;
}
type SubmitProps = {
    onSubmitSuccess: Dispatch<SetStateAction<boolean>>
    showToast: Dispatch<SetStateAction<boolean>>
}

const AddTransaction = ({onSubmitSuccess, showToast}: SubmitProps) => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        console.log("Categories", CATEGORIES);
    }, [CATEGORIES]);
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
        amount: z.coerce.number().min(0.01, "Amount must be positive."),
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
            name: "",
            description: "",
            amount: 0,
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("submit",JSON.stringify(values));
        try{
            const res = await fetch("api/transactions", {
                method: "POST",
                body: JSON.stringify(values)
            })
            const result = await res.json();
            console.log("RESULT", result);
            if(res.status === 400){
                toast.error(result.error)
            }
            if (result.success) {
                form.reset()
                onSubmitSuccess(prev => !prev);
                showToast(true);
                setOpen(false)
                return;
            }
        }catch (e) {
            console.log(e)
            return
        }
    }
    const selectedWalletId = form.watch("walletType")
    const selectedWallet: Wallet | undefined = wallets.find((wallet: Wallet) =>
        wallet.account_id === Number(selectedWalletId)
    )
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span className="font-medium">Add transaction</span>
            </div>
            </DialogTrigger>
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
                            name="description"
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
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
                                            <SelectTrigger className="w-full">
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
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter amount"
                                            type="number"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {selectedWallet && selectedWallet.balance < form.watch("amount") &&
                                        <div className="flex text-xl font-medium text-red-500">Not enough money</div>}
                                </FormItem>
                            )}
                        />
                        {selectedWallet && selectedWallet.balance < form.watch("amount") ?
                            <Button disabled={true} type="submit">Submit</Button> : <Button disabled={false} type="submit">Submit</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTransaction;