import { PageProps } from "@/types";
import { z } from "zod";

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
});

export type UserItem = z.infer<typeof userSchema>;

export type UserProps = {
    userList: UserItem[];
} & PageProps;
