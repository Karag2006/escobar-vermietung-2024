import { useState } from "react";

import { TextareaTP24 } from "@/Components/ui/textarea-tp24";

import { JsonResult } from "./JsonResult";

export type JSONRechnungskauf = {
    accountHolder: string;
    iban: string;
    bic: string;
    bankName: string;
    amount: number;
    reference: string;
    dueDate?: string;
};

export const JSONForm = () => {
    const [jsonText, setJsonText] = useState("");
    const [resultText, setResultText] = useState("");

    const clearInput = () => {
        setJsonText("");
        setResultText("");
    };

    const formatCurrency = (price?: number) => {
        if (!price) return 0;
        return String(price).replace(".", ",");
    };

    const createInvoiceText = (json: JSONRechnungskauf) => {
        if (
            !json.accountHolder ||
            !json.iban ||
            !json.bic ||
            !json.bankName ||
            !json.amount ||
            !json.reference
        ) {
            setResultText(
                "Fehler beim Umwandeln. Bitte überprüfen Sie die Eingabe."
            );
            return;
        }
        const invoiceText = `
            Vielen Dank für Ihren Einkauf.<br>
            <br>
            Bitte überweisen Sie den Betrag
            ${json.dueDate ? " bis zum " + json.dueDate : ""}
            auf das folgende Bankkonto.<br><br>
            Kontoinhaber (Zahlungsempfänger): ${json.accountHolder}<br>
            IBAN: ${json.iban}<br>
            BIC: ${json.bic}<br>
            Name der Bank: ${json.bankName} <br>
            Betrag: ${formatCurrency(json.amount)} €<br>
            Verwendungszweck: ${json.reference}
        `;
        setResultText(invoiceText);
    };

    const handleJsonTextChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setJsonText(e.target.value);
        try {
            const json = JSON.parse(e.target.value);
            if (json && typeof json === "object") createInvoiceText(json);
            else setResultText("");
        } catch (error) {
            setResultText("");
        }
    };

    return (
        <form className="flex flex-col gap-4 sm:max-w-[35rem]">
            <h3 className="font-bold">Eingabe:</h3>
            <TextareaTP24
                clearText={() => clearInput()}
                rows={7}
                value={jsonText}
                onChange={handleJsonTextChange}
                placeholder="Rechnungstext aus Speed4Trade hier einfügen"
            />

            <div className="h-[300px]">
                <JsonResult result={resultText} />
            </div>
        </form>
    );
};
