import { FolderArchive } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Document } from "@/types/document";
import { cn } from "@/lib/utils";

interface ArchiveActionProps {
    document: Document;
    archive: (document: Document) => void;
    tooltip?: string;
}

export const ArchiveAction = ({
    document,
    archive,
    tooltip,
}: ArchiveActionProps) => {
    return (
        <div className={cn("text-orange-600")}>
            {!document?.is_archived ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="icon"
                            size="content"
                            onClick={() => archive(document)}
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
            ) : (
                <Button
                    variant="icon"
                    size="content"
                    onClick={() => archive(document)}
                    disabled={document?.is_archived}
                >
                    <FolderArchive className="h-5 w-5" />

                    <span className="sr-only">
                        {tooltip || "Dokument archivieren"}
                    </span>
                </Button>
            )}
        </div>
    );
};
