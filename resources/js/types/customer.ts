import { PageProps } from "@/types";
import { z } from "zod";

export const customerSchema = z.object({
    id: z.number().optional(),
    name1: z.string(),
    name2: z.string().optional(),
    city: z.string().optional(),
    plz: z.string().optional(),
});

export type CustomerItem = z.infer<typeof customerSchema>;

export type CustomerProps = {
    customers: CustomerItem[];
} & PageProps;
