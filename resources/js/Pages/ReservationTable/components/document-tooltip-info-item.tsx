interface DocumentTooltipInfoItemProps {
    label: string;
    value: string;
}

export const DocumentTooltipInfoItem = ({
    label,
    value,
}: DocumentTooltipInfoItemProps) => {
    return (
        <div className="flex justify-between gap-8">
            <span>{label}:</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
};
