interface LoadingSizeDisplayProps {
    loadingSize?: string | null;
    // loadingSize is expected be the string representation of an array with the form:
    // [Length, Width, Height] where Height is optional

    className?: string;
}

export const LoadingSizeDisplay = ({
    loadingSize,
    className,
}: LoadingSizeDisplayProps) => {
    let displayString = null;
    if (loadingSize) {
        displayString = `${loadingSize[0]} x ${loadingSize[1]}`;
        if (loadingSize[2])
            displayString = displayString + ` x ${loadingSize[2]}`;

        displayString = displayString + " cm";
    }
    return <span className={className}>{displayString}</span>;
};
