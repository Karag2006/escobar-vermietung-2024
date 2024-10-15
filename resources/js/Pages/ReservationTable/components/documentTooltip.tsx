import { getDocumentTypeTranslation } from "@/lib/utils";
import { Document } from "@/types/document";
import { DocumentTooltipInfoItem } from "./document-tooltip-info-item";

interface DocumentTooltipProps {
    document: Document;
}

export const DocumentTooltip = ({ document }: DocumentTooltipProps) => {
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
                value={`${document.collect_date} - ${document.collect_time}`}
            />
            <DocumentTooltipInfoItem
                label="Rückgabe"
                value={`${document.return_date} - ${document.return_time}`}
            />
        </div>
    );
};
