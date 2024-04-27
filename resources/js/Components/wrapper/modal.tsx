import { Dialog, DialogContent } from "@/Components/ui/dialog";

interface ModalProps {
    children: React.ReactNode;
    modalOpen: boolean;
    openChange: (open: boolean) => void;
}

export const Modal = ({ children, modalOpen, openChange }: ModalProps) => {
    return (
        <Dialog open={modalOpen} onOpenChange={(open) => openChange(open)}>
            <DialogContent className=" max-w-full xl:max-w-[1200px] p-10 max-h-[90%] overflow-y-auto">
                {children}
            </DialogContent>
        </Dialog>
    );
};
