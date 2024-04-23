import { PageProps } from "@/types";
import { z } from "zod";

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
});

export type UserItem = z.infer<typeof userSchema>;

export type UserProps = {
    userList: UserItem[];
} & PageProps;
