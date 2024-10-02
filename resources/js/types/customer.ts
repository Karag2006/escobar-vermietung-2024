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

export type CustomerError = {
    id?: string;
    pass_number?: string;
    name1?: string;
    name2?: string;
    birth_date?: string;
    birth_city?: string;
    street?: string;
    plz?: string;
    city?: string;
    phone?: string;
    email?: string;
    driving_license_no?: string;
    driving_license_class?: string;
    car_number?: string;
    comment?: string;
};

export type CustomerField = keyof CustomerError;
