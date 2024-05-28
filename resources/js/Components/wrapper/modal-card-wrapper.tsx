import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/Components/ui/card";

interface CardWrapperProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    showHeader?: boolean;
}

export const ModalCardWrapper = ({
    children,
    footer,
    header,
    showHeader,
}: CardWrapperProps) => {
    return (
        <Card className="w-full bg-white shadow-md h-full sm:rounded-lg">
            {showHeader && (
                <CardHeader className="px-10 py-4">{header}</CardHeader>
            )}
            <CardContent className="px-6 py-4">{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};
