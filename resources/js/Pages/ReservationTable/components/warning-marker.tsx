import { TriangleAlert } from "lucide-react";

interface WarningMarkerProps {
    message: string;
}

export const WarningMarker = () => {
    return (
        <div className="absolute bottom-6">
            <TriangleAlert color="red" className="h-6 w-6" />
        </div>
    );
};
