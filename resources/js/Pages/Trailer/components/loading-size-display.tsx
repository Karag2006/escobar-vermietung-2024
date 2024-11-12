import { useEffect, useState } from "react";

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
    const [displayString, setDisplayString] = useState("");
    let loadingSizeArray: string[] = [];

    const createDisplayString = (loadingSize: string) => {
        let displayString = "";
        loadingSizeArray = JSON.parse(loadingSize);
        displayString = `${loadingSizeArray[0]} x ${loadingSizeArray[1]}`;
        if (loadingSizeArray[2])
            displayString = displayString + ` x ${loadingSizeArray[2]}`;

        displayString = displayString + " cm";

        return displayString;
    };

    useEffect(() => {
        if (loadingSize) {
            setDisplayString(createDisplayString(loadingSize));
        }
    }, [loadingSize]);

    return <span className={className}>{displayString}</span>;
};
