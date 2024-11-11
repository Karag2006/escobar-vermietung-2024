import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { dateFormat } from "@/lib/constants";
import { floatToString } from "@/lib/curency-functions";
import { AnalysisType } from "@/types/analysis";
import { TrailerItem } from "@/types/trailer";
import { format } from "date-fns";

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
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Auswertung für Anhänger <span>{trailer.plateNumber}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 font-semibold">
                    <div>Auswertungszeitraum : </div>
                    <div>
                        vom: {format(startDate, dateFormat)} bis zum:{" "}
                        {format(endDate, dateFormat)}
                    </div>
                    <div>Anzahl der Mietverträge in diesem Zeitraum: </div>
                    <div>{analysisData.numberOfContracts} Mietverträge</div>
                    <div>Gesamt Summe Brutto:</div>
                    <div>{floatToString(analysisData.total)} €</div>
                </div>
            </CardContent>
        </Card>
    );
};
