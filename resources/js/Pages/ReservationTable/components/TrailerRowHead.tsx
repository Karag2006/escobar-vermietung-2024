import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";
import { TrailerItem } from "@/types/trailer";
import { format } from "date-fns";

interface TrailerRowHeadProps {
    trailer: TrailerItem;
}
export const TrailerRowHead = ({ trailer }: TrailerRowHeadProps) => {
    const tuevDate = trailer.inspection_at
        ? format(trailer.inspection_at, "MM/yy")
        : trailer.tuev;

    return (
        <>
            <Tooltip>
                <TooltipTrigger className="w-[17rem] flex">
                    <div className="w-[7rem] text-ellipsis text-left pl-1">
                        {trailer.plateNumber.trim()}
                    </div>
                    <div className="w-[10rem] truncate text-left">
                        {trailer.title}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="flex flex-col p-4 border border-muted-foreground">
                        <div className="text-sm">
                            Bezeichnung:{" "}
                            <span className="font-semibold">
                                {trailer.title}
                            </span>
                        </div>
                        <div className="text-sm">
                            Kennzeichen:{" "}
                            <span className="font-semibold">
                                {trailer.plateNumber}
                            </span>
                        </div>
                        <div className="text-sm flex items-center gap-2">
                            Nächster Tüv Termin: <TuevBatch tuev={tuevDate} />
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </>
    );
};
