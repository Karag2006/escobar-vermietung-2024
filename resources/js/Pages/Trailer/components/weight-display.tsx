interface WeightDisplayProps {
    weight?: string | null;
    unit: string;
    className?: string;
}

export const WeightDisplay = ({
    weight,
    unit,
    className,
}: WeightDisplayProps) => {
    let displayString = "";
    if (weight) displayString = `${weight} ${unit}`;
    return <span className={className}>{displayString}</span>;
};
