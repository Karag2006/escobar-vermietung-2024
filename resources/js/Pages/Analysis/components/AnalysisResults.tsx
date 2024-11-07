import { AnalysisType } from "@/types/analysis";
import { TrailerItem } from "@/types/trailer";

interface AnalysisResultsProps {
    analysisData: AnalysisType;
    trailer: TrailerItem;
    startDate: Date;
    endDate: Date;
}

export const AnalysisResults = ({
    analysisData,
    trailer,
    startDate,
    endDate,
}: AnalysisResultsProps) => {
    return <div>AnalysisResults</div>;
};
