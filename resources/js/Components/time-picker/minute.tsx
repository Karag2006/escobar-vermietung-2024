import { minutes } from "@/data/JSON/timeCircle.json";
import { Digit } from "./digit";

interface MinuteProps {
    handleClick: (minute: string) => void;
    displayTime: { hour: string; minute: string };
}

export const Minute = ({ displayTime, handleClick }: MinuteProps) => {
    return (
        <div className="clock">
            <div className="clock-face">
                {minutes.map((minute) => (
                    <Digit
                        key={minute.number}
                        digit={minute}
                        width={19}
                        size={2.4}
                        handleClick={() => handleClick(minute.number + "")}
                    />
                ))}
            </div>
        </div>
    );
};
