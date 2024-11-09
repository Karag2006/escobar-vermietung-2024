import { MdExposurePlus1, MdExposurePlus2 } from "react-icons/md";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface PlusYearsProps {
    id: number;
    years: 1 | 2;
    plusYears: (id: number, years: 1 | 2) => void;
    tooltip?: string;
}

export const PlusYears = ({
    id,
    years,
    plusYears,
    tooltip,
}: PlusYearsProps) => {
    return (
        <div className=" text-blue-600">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="icon"
                        size="content"
                        onClick={() => plusYears(id, years)}
                    >
                        {years === 1 ? (
                            <MdExposurePlus1 className="h-5 w-5" />
                        ) : (
                            <MdExposurePlus2 className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                            {tooltip || years + " Jahre verlängern"}
                        </span>
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {tooltip || years + " Jahre verlängern"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
