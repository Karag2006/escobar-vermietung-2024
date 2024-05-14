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
});

export type TrailerItem = z.infer<typeof trailerSchema>;

export type TrailerProps = {
    trailers: TrailerItem[];
} & PageProps;
