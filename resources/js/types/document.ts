import { PageProps } from "@/types";
import { z } from "zod";

export const offerSchema = z.object({
    id: z.number().optional().nullable(),
    offer_number: z.number(),
    collect_date: z.string(),
    return_date: z.string(),
    customer_name1: z.string(),
    vehicle_title: z.string(),
    vehicle_plateNumber: z.string(),
    collect_address_id: z.number(),
});

export type OfferItem = z.infer<typeof offerSchema>;

export type OfferProps = {
    offerList: OfferItem[];
} & PageProps;
