import { CircleArrowUp, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { DocumentFunctions } from "@/types/document";

interface DocumentTooltipActionsProps {
    documentId?: number | null;
    documentState: string;
    documentFunctions: DocumentFunctions;
    documentNr?: number | null;
}

export const DocumentTooltipActions = ({
    documentId,
    documentState,
    documentFunctions,
    documentNr,
}: DocumentTooltipActionsProps) => {
    return (
        <div className="mt-2 flex gap-4 justify-between">
            <Button
                variant="success"
                size="sm"
                onClick={
                    documentId
                        ? () =>
                              documentFunctions.edit(
                                  documentId,
                                  documentState,
                                  documentNr ? documentNr : 0
                              )
                        : () => console.log("error")
                }
                aria-label="Bearbeiten"
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="destructive"
                size="sm"
                onClick={
                    documentId
                        ? () =>
                              documentFunctions.delete(
                                  documentId,
                                  documentState,
                                  documentNr ? documentNr : 0
                              )
                        : () => console.log("error")
                }
                aria-label="Löschen"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button
                size="sm"
                onClick={
                    documentId
                        ? () =>
                              documentFunctions.forward(
                                  documentId,
                                  documentState,
                                  documentNr ? documentNr : 0
                              )
                        : () => console.log("error")
                }
                aria-label="auf nächsten Dokumentenstatus setzen"
                disabled={documentState === "contract"}
            >
                <CircleArrowUp className="h-4 w-4" />
            </Button>
        </div>
    );
};
