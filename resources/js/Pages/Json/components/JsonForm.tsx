import { useState } from "react";

import { Button } from "@/Components/ui/button";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";

type outputType = {
    dueDate?: string;
    accountHolder?: string;
    iban?: string;
    bic?: string;
    bankName?: string;
    amount?: number;
    reference?: string;
};

export const JsonForm = () => {
    const [output, setOutput] = useState<outputType>({});
    const [outputText, setOutputText] = useState("");

    const formatCurrency = (price?: number | null) => {
        if (!price) return "0";
        return String(price).replace(".", ",");
    };

    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const object: outputType = JSON.parse(value) ? JSON.parse(value) : {};

        if (object && object.iban) {
            setOutput(object);
            setOutputText(createOutputText(object));
        }
    };

    const createOutputText = (object: outputType) => {
        return `Vielen Dank für Ihren Einkauf.<br>
<br>
Bitte überweisen Sie den Betrag${
            object.dueDate ? " bis zum " + object.dueDate : ""
        } auf das folgende Bankkonto.<br>
<br>
	Kontoinhaber (Zahlungsempfänger): ${object.accountHolder}<br>
	IBAN: ${object.iban}<br>
	BIC: ${object.bic}<br>
	Name der Bank: ${object.bankName} <br>
	Betrag: ${formatCurrency(object.amount)} €<br>
	Verwendungszweck: ${object.reference}
`;
    };

    return (
        <>
            <div className="mt-6">
                <TextareaTP24
                    className="w-full"
                    label="Eingabe"
                    id="input"
                    rows={5}
                    onChange={handleChange}
                />
            </div>
            <div className="mt-6 flex flex-col gap-4 h-[300px]">
                <hr />
                <h3>Ausgabe:</h3>
                {output && output.iban && (
                    <div className="flex">
                        <div>{outputText}</div>
                        <Button>Copy</Button>
                    </div>
                )}
            </div>
        </>
    );
};
