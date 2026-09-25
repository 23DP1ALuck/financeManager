import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox";
import {Trash2} from "lucide-react";
import React, {useState} from "react";
import {Wallet} from "@/lib/types";

type DeleteButtonProps = {
    wallet?: Wallet | null;
    handleDeleteSuccess: () => void;
}

const DeleteButton = ({wallet, handleDeleteSuccess} : DeleteButtonProps) => {
    // state for checkbox
    const [confirm, setConfirm] = useState<boolean>(false);
    // state for opening dialog
    const [open, setOpen] = useState<boolean>(false);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("test");
        e.preventDefault();
        try{
            const formData = new FormData(e.currentTarget);
            const data = {
                walletId: wallet?.account_id,
                deleteTransactions: formData.get("delete-transactions") === "on",
            }
            console.log("data in delete comp before fetch",data)
            await fetch("/api/wallets", {
                method: "DELETE",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(res =>
            {
                if (res.success) {
                    console.log("res in delete comp",res)
                    setConfirm(prev => !prev);
                    setOpen(false);
                    handleDeleteSuccess();
                }
                console.log("res in delete comp",res)
            })
        }catch (e) {
            console.log(e)
            return
        }
        setOpen(false)
    }
    return(
        <div>

            <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        {wallet && <Button variant="destructive" size="lg" className="flex items-center gap-2 cursor-pointer">
                            <Trash2 size={16} /> Delete Wallet
                        </Button>
                        }
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg p-6 bg-white rounded-xl shadow-lg">
                        <form onSubmit={onSubmit}>
                        <DialogHeader>
                            <DialogTitle>Delete wallet</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete this wallet? This action&nbsp;<span className="font-semibold text-red-600">cannot be undone</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <Checkbox
                                    id="delete-transactions"
                                    checked={confirm}
                                    onCheckedChange={() => setConfirm(!confirm)}
                                    name="delete-transactions"
                                />
                                <Label htmlFor="delete-transactions" className="ml-3 text-sm text-gray-700">
                                    Also delete all transactions associated with this wallet
                                </Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Yes, delete this wallet</Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
            </Dialog>
        </div>

    );
}
export default DeleteButton;