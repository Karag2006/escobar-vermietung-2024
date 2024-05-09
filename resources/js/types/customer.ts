import { PageProps } from "@/types";
import { z } from "zod";

export const customerSchema = z.object({
    id: z.number().optional().nullable(),
    name1: z.string(),
    name2: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    plz: z.number().optional().nullable(),
});

export type CustomerItem = z.infer<typeof customerSchema>;

export type CustomerProps = {
    customers: CustomerItem[];
} & PageProps;
