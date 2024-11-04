import { Button } from "@/Components/ui/button";
import { Archive, ArchiveX } from "lucide-react";

interface ArchiveButtonProps {
    status: boolean;
    onClick: () => void;
}

export const ArchiveButton = ({
    status = false,
    onClick,
}: ArchiveButtonProps) => {
    return (
        <Button onClick={() => onClick()} size="sm">
            {status ? (
                <div className="flex gap-4">
                    <ArchiveX className=" size-5" /> Hide Archive
                </div>
            ) : (
                <div className="flex gap-4">
                    <Archive className=" size-5" /> Show Archive
                </div>
            )}
        </Button>
    );
};
