import { PageProps } from "@/types";
import { z } from "zod";
import { TrailerItem } from "./trailer";

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
    collect_time: z.string(),
    return_time: z.string(),
    customer_name1: z.string(),
    vehicle_id: z.number(),
    vehicle_title: z.string(),
    vehicle_plateNumber: z.string(),
    collect_address_id: z.number(),
    current_state: z.string(),
    added: z.boolean().optional().nullable(),
    colorClass: z.string().optional().nullable(),
    collect_address: z.object({ id: z.number(), name: z.string() }),
});

export type Document = z.infer<typeof documentSchema>;

export type DocumentProps = {
    offerList?: Document[];
    reservationList?: Document[];
    contractList?: Document[];
    type: documentType;
    ForwardDocument?: number;
} & PageProps;

export type ReservationTableProps = {
    reservationList: Document[];
    trailers: TrailerItem[];
    month: string;
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
    documentType: string;
    documentNumber?: number;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    customerName?: string;
    reservationFeePayed?: boolean;
    reservationFeeDate?: string;
};

export type DataErrors = {
    id?: string;
    offer_number?: string;
    reservation_number?: string;
    contract_number?: string;
    offer_date?: string;
    reservation_date?: string;
    contract_date?: string;
    current_state?: string;
    collect_date?: string;
    return_date?: string;
    collect_time?: string;
    return_time?: string;
    total_price?: string;
    netto_price?: string;
    tax_value?: string;
    reservation_deposit_value?: string;
    reservation_deposit_date?: string;
    reservation_deposit_type?: string;
    reservation_deposit_recieved?: string;
    final_payment_value?: string;
    final_payment_date?: string;
    final_payment_type?: string;
    final_payment_recieved?: string;
    contract_bail?: string;
    contract_bail_date?: string;
    contract_bail_type?: string;
    contract_bail_return_type?: string;
    contract_bail_recieved?: string;
    contract_bail_returned?: string;
    comment?: string;
    user_id?: string;
    collect_address_id?: string;
};

export type DataField = keyof DataErrors;
