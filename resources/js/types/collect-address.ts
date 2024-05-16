import { PageProps } from "@/types";
import { z } from "zod";

export const collectAddressSchema = z.object({
    id: z.number().optional().nullable(),
    name: z.string(),
    address: z.string(),
});

export type CollectAddressItem = z.infer<typeof collectAddressSchema>;

export type CollectAddressProps = {
    collectAddressList: CollectAddressItem[];
} & PageProps;
