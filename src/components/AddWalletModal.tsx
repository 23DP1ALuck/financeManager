"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import { Dispatch, SetStateAction } from "react";

type OnSuccessProp = Dispatch<SetStateAction<boolean>>;

const AddWalletModal = ({onSuccess} : {onSuccess : OnSuccessProp}) => {
    const [open, setOpen] = useState(false);
    const formSchema = z.object({
        balance: z.number().min(0, {
            message: "Balance must be greater than 0",
        }),
        walletType: z.string().nonempty({
            message: "Wallet type is required",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            walletType: "Other",
            balance: "" as unknown as number
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const res = await fetch("api/wallets", {
                method: "POST",
                body: JSON.stringify(values)
            })
            const result = await res.json()
            console.log(result);
            onSuccess(prev=>!prev)
        }catch (e) {
            console.log(e)
            return
        }
        setOpen(false)

    }
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><div className="flex bg-[#7EF9D28b] text-black/90 rounded-full p-1 items-center cursor-pointer">
                <div className="flex bg-white rounded-full h-6 w-6 items-center justify-center">
                    +
                </div>
                <h1 className="text-black/90 font-semibold px-2">Add wallet</h1>
            </div></DialogTrigger>
            <DialogContent className="max-w-md w-[400px] gap-3">

                <DialogHeader>
                    <DialogTitle>Enter the details</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="walletType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Balance</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select wallet type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Swedbank">
                                                    <div className="flex items-center gap-2">
                                                        Swedbank
                                                        <Image src="/SWEDBANK.png" alt="Swedbank icon" width={20} height={20}
                                                               className="object-contain"/>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Seb">
                                                    <div className="flex items-center gap-2">
                                                        Seb
                                                        <Image src="/SEB.png" alt="SEB icon" width={20} height={20}
                                                               className="object-contain"/>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Citadele">
                                                    <div className="flex items-center gap-2">
                                                        Citadele
                                                        <Image src="/CITADELE.png" alt="Citadele icon" width={20} height={20}
                                                               className="object-contain"/>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Revolut">
                                                    <div className="flex items-center gap-2">
                                                        Revolut
                                                        <Image src="/REVOLUT.png" alt="Revolut icon" width={20} height={20}
                                                               className="object-contain"/>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Wise">
                                                    <div className="flex items-center gap-2">
                                                        Wise
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Cash">Cash</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"balance"}
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

export default AddWalletModal;