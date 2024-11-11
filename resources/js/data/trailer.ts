import { AnalysisRequestData } from "@/types/analysis";
import axios from "axios";

export const getTrailerById = async (id: number) => {
    const { data } = await axios.get(`/trailer/${id}`);
    return data;
};

export const getTrailerSelectors = async () => {
    const { data } = await axios.get("/selector/trailer");
    return data;
};

export const getTuev = async (id: number) => {
    const { data } = await axios.get(`/tuev/${id}`);
    return data;
};

export const deleteTrailerById = async (id: number) => {
    const { data } = await axios.delete(route("trailer.delete", id));
    return data;
};

// 05.11.2024 Feature Inspection List
export const updateInspectionDate = async (id: number, years: 1 | 2) => {
    const { data } = await axios.patch(route("trailer.tuev.update", id), {
        years,
    });
    return data;
};

export const createTrailerAnalysis = async (
    id: number,
    data: AnalysisRequestData
) => {
    const result = await axios.post(route("analysis.create", id), data);
    return result;
};
