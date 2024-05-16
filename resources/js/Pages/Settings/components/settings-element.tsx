import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

interface SettingsElementProps {
    children: React.ReactNode;
    label: string;
}

export const SettingsElement = ({ children, label }: SettingsElementProps) => {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg">{label}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
