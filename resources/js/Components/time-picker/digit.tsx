import { Button } from "../ui/button";

interface DigitProps {
    digit: { number: number; degree: number };
    size: number;
    width: number;
    handleClick: () => void;
}

export const Digit = ({ digit, size, width, handleClick }: DigitProps) => {
    const radius = () => {
        if (width && size) return (width - size) / 2;
    };

    const coordinates = () => {
        const currentRadius = radius();
        if (currentRadius && digit) {
            const rad = digit.degree * (Math.PI / 180);
            let temp = { x: "", y: "" };
            temp.x = currentRadius + currentRadius * Math.cos(rad) + "rem";
            temp.y = currentRadius + currentRadius * Math.sin(rad) + "rem";
            return temp;
        }
    };

    const currentCoordinates = coordinates();

    return (
        <time
            style={{ top: currentCoordinates?.y, left: currentCoordinates?.x }}
        >
            <Button
                variant="borderless"
                className="borderless"
                onClick={handleClick}
            >
                {digit.number}
            </Button>
        </time>
    );
};
