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

export const CardWrapper = ({
    children,
    footer,
    header,
    showHeader,
}: CardWrapperProps) => {
    return (
        <Card className="sm:min-w-[560px] w-[90%] bg-white shadow-md overflow-hidden sm:rounded-lg">
            {showHeader && <CardHeader className="p-0">{header}</CardHeader>}
            <CardContent className="px-6 py-4">{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};
