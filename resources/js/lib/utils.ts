import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const getDocumentTypeTranslation = (type: string) => {
    switch (type) {
        case "offer":
            return "Angebot";
        case "reservation":
            return "Reservierung";
        default:
            return "Mietvertrag";
    }
};
export const getDocumentPluralTypeTranslation = (type: string) => {
    switch (type) {
        case "offer":
            return "Angebote";
        case "reservation":
            return "Reservierungen";
        default:
            return "Mietverträge";
    }
};

export const getDocumentTypeArticle = (type: string) => {
    switch (type) {
        case "offer":
            return "das";
        case "reservation":
            return "die";
        default:
            return "der";
    }
};

export const getDocumentNextTypeTranslation = (type: string) => {
    if (type === "offer") return getDocumentTypeTranslation("reservation");

    return getDocumentTypeTranslation("contract");
};

export const isObjectEmpty = (objectName: any) => {
    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    );
};
