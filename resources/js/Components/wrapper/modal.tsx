import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
    children: React.ReactNode;
    modalOpen: boolean;
    className?: string;
    openChange: (open: boolean) => void;
}

export const Modal = ({
    children,
    modalOpen,
    className,
    openChange,
}: ModalProps) => {
    return (
        <Dialog open={modalOpen} onOpenChange={(open) => openChange(open)}>
            <DialogContent
                className={cn(
                    " max-w-full xl:max-w-[1200px] p-10 max-h-[90%] overflow-y-auto",
                    className
                )}
            >
                {children}
            </DialogContent>
        </Dialog>
    );
};
