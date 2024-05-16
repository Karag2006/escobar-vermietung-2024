import { PageProps } from "@/types";
import { z } from "zod";
import { CollectAddressItem } from "./collect-address";

export const settingSchema = z.object({
    id: z.number(),
    vat: z.number(),
    offer_note: z.string(),
    reservation_note: z.string(),
    contract_note: z.string(),
    document_footer: z.string(),
    contactdata: z.string(),
    license_classes: z.string(),
    payment_types: z.string(),
});

export type SettingItem = z.infer<typeof settingSchema>;

export type SettingProps = {
    settings: SettingItem;
    collectAddressList: CollectAddressItem[];
} & PageProps;
