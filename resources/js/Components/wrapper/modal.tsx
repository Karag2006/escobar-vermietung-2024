import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
    children: React.ReactNode;
    modalOpen: boolean;
    className?: string;
    title?: string;
    description?: string;
    openChange: (open: boolean) => void;
}

export const Modal = ({
    children,
    modalOpen,
    className,
    title,
    description,
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
                <DialogTitle>
                    <span className="sr-only">{title}</span>
                </DialogTitle>
                <DialogDescription>
                    <span className="sr-only">{description}</span>
                </DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    );
};
