import { PageProps } from "@/types";
import { TrailerItem } from "./trailer";
import { Document } from "./document";

export type AnalysisRequestData = {
    trailerId: number;
    startDate: Date;
    endDate: Date;
};

export type AnalysisType = {
    total: number;
    numberOfContracts: number;
    contractList?: Document[];
};

export type AnalysisProps = {
    analysis?: AnalysisType;
    trailer?: TrailerItem;
} & PageProps;
