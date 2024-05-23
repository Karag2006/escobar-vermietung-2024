import { outerHours, innerHours } from "@/data/JSON/timeCircle.json";
import { Digit } from "./digit";

interface HourProps {
    handleClick: (hour: string) => void;
    displayTime: { hour: string; minute: string };
}

export const Hour = ({ handleClick, displayTime }: HourProps) => {
    return (
        <div className="clock">
            <div className="clock-face">
                {outerHours.map((hour) => (
                    <Digit
                        key={hour.number}
                        digit={hour}
                        width={19}
                        size={2.4}
                        handleClick={() => handleClick(hour.number + "")}
                    />
                ))}

                <div className="clock-face--24">
                    {innerHours.map((hour) => (
                        <Digit
                            key={hour.number}
                            digit={hour}
                            width={14}
                            size={2.4}
                            handleClick={() => handleClick(hour.number + "")}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
