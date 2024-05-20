import { PageProps } from "@/types";
import { z } from "zod";

export enum customerType {
    CUSTOMER = "customer",
    DRIVER = "driver",
}

export enum documentType {
    OFFER = "offer",
    RESERVATION = "reservation",
    CONTRACT = "contract",
}

export const documentSchema = z.object({
    id: z.number().optional().nullable(),
    offer_number: z.number().optional().nullable(),
    collect_date: z.string(),
    return_date: z.string(),
    customer_name1: z.string(),
    vehicle_title: z.string(),
    vehicle_plateNumber: z.string(),
    collect_address_id: z.number(),
});

export type Document = z.infer<typeof documentSchema>;

export type DocumentProps = {
    offerList?: Document[];
    type: documentType;
} & PageProps;
