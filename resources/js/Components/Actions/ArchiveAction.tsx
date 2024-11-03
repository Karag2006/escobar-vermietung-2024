import { FolderArchive } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ArchiveActionProps {
    id: number;
    archive: (id: number) => void;
    tooltip?: string;
}

export const ArchiveAction = ({ id, archive, tooltip }: ArchiveActionProps) => {
    return (
        <div className=" text-orange-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => archive(id)}
                    >
                        <FolderArchive className="h-5 w-5" />

                        <span className="sr-only">
                            {tooltip || "Dokument archivieren"}
                        </span>
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {tooltip || "Dokument archivieren"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
