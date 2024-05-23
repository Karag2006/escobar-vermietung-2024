import { outerHours, innerHours } from "@/data/JSON/timeCircle.json";

interface HourProps {
    handleClick: (hour: string) => void;
    displayTime: { hour: string; minute: string };
}

export const Hour = ({ handleClick, displayTime }: HourProps) => {
    return <div>Hour</div>;
};
