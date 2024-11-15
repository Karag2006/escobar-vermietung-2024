import { getDocumentTypeTranslation } from "@/lib/utils";
import { Document, DocumentFunctions } from "@/types/document";
import { DocumentTooltipInfoItem } from "./document-tooltip-info-item";
import { DocumentTooltipActions } from "./document-tooltip-actions";
import { format } from "date-fns";

interface DocumentTooltipProps {
    document: Document;
    documentFunctions: DocumentFunctions;
}

export const DocumentTooltip = ({
    document,
    documentFunctions,
}: DocumentTooltipProps) => {
    const current_state = document.current_state;
    const documentNr =
        current_state === "offer"
            ? document.offer_number
            : current_state === "reservation"
            ? document.reservation_number
            : document.contract_number;

    const collectDate = document.collectTimestamp
        ? format(document.collectTimestamp, "dd.MM.yyyy")
        : "";
    const collectTime = document.collectTimestamp
        ? format(document.collectTimestamp, "HH:mm")
        : "";
    const returnDate = document.returnTimestamp
        ? format(document.returnTimestamp, "dd.MM.yyyy")
        : "";
    const returnTime = document.returnTimestamp
        ? format(document.returnTimestamp, "HH:mm")
        : "";

    return (
        <div className="p-2 border border-black">
            <DocumentTooltipInfoItem
                label="Status"
                value={getDocumentTypeTranslation(document.current_state)}
            />
            <DocumentTooltipInfoItem
                label="Abholstation"
                value={document.collect_address.name}
            />
            <DocumentTooltipInfoItem
                label="Kunde"
                value={document.customer_name1}
            />
            <DocumentTooltipInfoItem
                label="Mietpreis"
                value={`${document.total_price} €`}
            />
            <DocumentTooltipInfoItem
                label="Abholung"
                value={`${collectDate} - ${collectTime}`}
            />
            <DocumentTooltipInfoItem
                label="Rückgabe"
                value={`${returnDate} - ${returnTime}`}
            />

            <DocumentTooltipActions
                documentId={document.id}
                documentState={document.current_state}
                documentNr={documentNr}
                documentFunctions={documentFunctions}
            />
        </div>
    );
};
