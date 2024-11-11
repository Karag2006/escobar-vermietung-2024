import { PageProps } from "@/types";
import { z } from "zod";

export const trailerSchema = z.object({
    id: z.number().optional().nullable(),
    title: z.string(),
    plateNumber: z.string(),
    totalWeight: z.string().optional().nullable(),
    usableWeight: z.string().optional().nullable(),
    loading_size: z
        .array(z.number().optional().nullable())
        .optional()
        .nullable(),
    tuev: z.string().optional().nullable(),
    inspection_at: z.string().optional().nullable(),
});

export type TrailerItem = z.infer<typeof trailerSchema>;

// 05.11.2024 Feature: Inspection List -
// Trailer Page gets new prop OpenEdit containing the id of the trailer to be edited,
// if OpenEdit Header was set.
export type TrailerProps = {
    trailers: TrailerItem[];
    openEdit?: number;
} & PageProps;

export type TrailerErrors = {
    title?: string;
    plateNumber?: string;
    totalWeight?: string;
    usableWeight?: string;
    "loading_size.0"?: string;
    "loading_size.1"?: string;
    "loading_size.2"?: string;
    loading_size?: string;
    comment?: string;
};

export type TrailerField = keyof TrailerErrors;
