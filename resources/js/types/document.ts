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
    reservation_number: z.number().optional().nullable(),
    contract_number: z.number().optional().nullable(),
    collect_date: z.string(),
    return_date: z.string(),
    customer_name1: z.string(),
    vehicle_title: z.string(),
    vehicle_plateNumber: z.string(),
    collect_address_id: z.number(),
    current_state: z.string(),
    collect_address: z.object({ id: z.number(), name: z.string() }),
});

export type Document = z.infer<typeof documentSchema>;

export type DocumentProps = {
    offerList?: Document[];
    reservationList?: Document[];
    contractList?: Document[];
    type: documentType;
} & PageProps;

export const SelectorSchema = z.object({
    id: z.number(),
    selector: z.string(),
});
export type SelectorItem = z.infer<typeof SelectorSchema>;

export const CollectAddressSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export type CollectAddressItem = z.infer<typeof CollectAddressSchema>;

export type collisionCheckData = {
    id?: number;
    vehicle_id: number;
    collect_date: string;
    return_date: string;
};

export type collisionData = {
    documentType?: string;
    documentNumber?: number;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    customerName?: string;
    reservationFeePayed?: boolean;
    reservationFeeDate?: string;
};
