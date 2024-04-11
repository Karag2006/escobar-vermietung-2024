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
    showFooter?: boolean;
}

export const CardWrapper = ({
    children,
    footer,
    header,
    showHeader,
    showFooter,
}: CardWrapperProps) => {
    return (
        <Card className="sm:min-w-[560px] w-[90%] bg-white shadow-md overflow-hidden sm:rounded-lg">
            {showHeader && <CardHeader className="p-0">{header}</CardHeader>}
            <CardContent className="px-6 py-4">{children}</CardContent>
            {showFooter && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};
