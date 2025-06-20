import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {Dispatch, SetStateAction, useState} from "react";



type DeleteTransactionProps = {
    transactionId?: number | null;
    onDelete: Dispatch<SetStateAction<boolean>>;
}

const DeleteTransaction = ({transactionId, onDelete} : DeleteTransactionProps) => {
    const [open, setOpen] = useState(false);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("test");
        e.preventDefault();
        try{
            if(transactionId){
                const data = {
                    walletId: transactionId,
                }
                await fetch("/api/transactions", {
                    method: "DELETE",
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(res =>
                {
                    if (res.success) {
                        console.log("res in delete comp",res)
                        onDelete(true);
                        setOpen(prev => !prev);
                    }
                    console.log("res in delete comp",res)
                })
            }


        }catch (e) {
            console.log(e)
            return
        }
        setOpen(false)
    }
    return(

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                   <div className="rounded-full py-2 px-4 w-fit text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer">Remove
                       transaction</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg p-6 bg-white rounded-xl shadow-lg">
                    <form onSubmit={onSubmit}>
                        <DialogHeader>
                            <DialogTitle>Delete transaction</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete this transaction? This action&nbsp;<span className="font-semibold text-red-600">cannot be undone</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Yes, delete this transaction</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    );
}
export default DeleteTransaction