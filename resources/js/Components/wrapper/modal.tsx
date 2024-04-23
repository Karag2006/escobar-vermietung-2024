import { Dialog, DialogContent } from "@/Components/ui/dialog";

interface ModalProps {
    children: React.ReactNode;
    modalOpen: boolean;
    openChange: (open: boolean) => void;
}

export const Modal = ({ children, modalOpen, openChange }: ModalProps) => {
    return (
        <Dialog open={modalOpen} onOpenChange={(open) => openChange(open)}>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};
