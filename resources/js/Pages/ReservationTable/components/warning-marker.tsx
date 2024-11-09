import { TriangleAlert } from "lucide-react";

export const WarningMarker = () => {
    return (
        <div className="absolute bottom-6">
            <TriangleAlert color="red" className="h-6 w-6" />
        </div>
    );
};
