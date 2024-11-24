import { useState } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface JsonResultProps {
    result?: string;
}

export const JsonResult = ({ result }: JsonResultProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        if (!result) return;

        const copyText = result.replace(/<\s*\/?br\s*[\/]?>/gi, "");

        navigator.clipboard.writeText(copyText);

        setCopied(true);
        toast.success("Text kopiert");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <h3 className="font-bold mb-4">Ausgabe:</h3>
            <div className="relative">
                <span
                    dangerouslySetInnerHTML={{ __html: result ? result : "" }}
                />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="secondary"
                            aria-label="Ausgabe Text in die Zwischenablage kopieren"
                            type="button"
                            disabled={copied}
                            className={cn(
                                "absolute top-1 right-0 bg-transparent text-neutral-500 hover:text-blue-400 hover:bg-neutral-200 transition-all hover:cursor-pointer",
                                copied &&
                                    "bg-green-300 hover:cursor-not-allowed disabled:opacity-75 hover:bg-green-300",
                                !result && "hidden"
                            )}
                        >
                            <Copy
                                className="size-6"
                                onClick={handleCopyClick}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Ausgabe Text in die Zwischenablage kopieren
                    </TooltipContent>
                </Tooltip>
            </div>
        </>
    );
};
