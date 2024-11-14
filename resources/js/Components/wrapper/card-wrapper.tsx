import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/Components/ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    ClassName?: string;
    showHeader?: boolean;
}

export const CardWrapper = ({
    children,
    footer,
    header,
    showHeader,
    ClassName,
}: CardWrapperProps) => {
    return (
        <Card
            className={cn(
                "sm:min-w-[560px] w-[90%] bg-white shadow-md overflow-hidden sm:rounded-lg mb-10",
                ClassName
            )}
        >
            {showHeader && <CardHeader className="p-0">{header}</CardHeader>}
            <CardContent className="px-6 py-4">{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};
