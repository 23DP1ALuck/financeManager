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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox";
import {Trash2} from "lucide-react";
import {useState} from "react";

const DeleteButton = () => {
    const [confirm, setConfirm] = useState<boolean>(false);
    return(
        <div>

            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="lg" className="flex items-center gap-2 cursor-pointer">
                            <Trash2 size={16} /> Delete Wallet
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg p-6 bg-white rounded-xl shadow-lg">
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
                    </DialogContent>
                </form>
            </Dialog>
        </div>

    );
}
export default DeleteButton;