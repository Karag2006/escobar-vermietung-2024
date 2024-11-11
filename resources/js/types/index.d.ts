import { Config } from "ziggy-js";
import { Document } from "./document";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PickerReturn = {
    id: string;
    value: string | number;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Actions = {
    edit?: {
        function: (id: number) => void;
        tooltip?: string;
    };
    delete?: {
        function: (id: number) => void;
        tooltip?: string;
    };
    forward?: {
        function: (id: number) => void;
        tooltip?: string;
    };
    print?: {
        function: (id: number) => void;
        tooltip?: string;
    };
    archive?: {
        function: (document: Document) => void;
        tooltip?: string;
    };
    plusOneYear?: {
        function: (id: number, years: 1) => void;
        tooltip?: string;
    };
    plusTwoYears?: {
        function: (id: number, years: 2) => void;
        tooltip?: string;
    };
};
