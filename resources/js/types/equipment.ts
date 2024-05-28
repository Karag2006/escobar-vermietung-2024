import { PageProps } from "@/types";
import { z } from "zod";

export const equipmentSchema = z.object({
    id: z.number(),
    defaultNumber: z.number().optional().nullable(),
    name: z.string(),
    details: z.string().optional().nullable(),
    number: z.number().optional().nullable(),
});

export type EquipmentItem = z.infer<typeof equipmentSchema>;

export type EquipmentProps = {
    equipmentList: EquipmentItem[];
} & PageProps;
