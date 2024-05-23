interface MinuteProps {
    handleClick: (minute: string) => void;
    displayTime: { hour: string; minute: string };
}

export const Minute = ({ displayTime, handleClick }: MinuteProps) => {
    return <div>Minute : {displayTime.minute}</div>;
};
