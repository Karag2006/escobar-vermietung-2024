import { PageProps } from "@/types";

export type UserItem = {
    id: number;
    name: string;
    email: string;
    username: string;
};

export type UserProps = {
    userList: UserItem[];
} & PageProps;
