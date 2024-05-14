import { ApplicationLogo } from "@/Components/ApplicationLogo";
import { Toaster } from "@/Components/ui/sonner";
import { CardWrapper } from "@/Components/wrapper/card-wrapper";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const header = (
        <div className="p-4">
            <ApplicationLogo />
        </div>
    );
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center">
            <CardWrapper header={header} showHeader>
                {children}
                <Toaster richColors />
            </CardWrapper>
        </div>
    );
}
