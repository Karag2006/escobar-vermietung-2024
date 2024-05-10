interface WeightDisplayProps {
    weight?: string | null;
    unit: string;
}

export const WeightDisplay = ({ weight, unit }: WeightDisplayProps) => {
    let displayString = "";
    if (weight) displayString = `${weight} ${unit}`;
    return <span>{displayString}</span>;
};
