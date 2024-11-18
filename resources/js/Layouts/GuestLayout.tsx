import { ApplicationLogo } from "@/Components/ApplicationLogo";
import { Toaster } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { CardWrapper } from "@/Components/wrapper/card-wrapper";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const header = (
        <div className="p-4">
            <ApplicationLogo />
        </div>
    );
    return (
        <div className="min-h-screen flex flex-col sm:mt-[10rem] items-center">
            <TooltipProvider>
                <CardWrapper
                    ClassName="sm:max-w-[35rem]"
                    header={header}
                    showHeader
                >
                    {children}
                    <Toaster richColors />
                </CardWrapper>
            </TooltipProvider>
        </div>
    );
}
