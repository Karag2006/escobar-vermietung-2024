import ApplicationLogo from "@/Components/ApplicationLogo";
import { CardWrapper } from "@/Components/wrapper/card-wrapper";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const header = (
        <div className="p-4">
            <Link href="/">
                <ApplicationLogo />
            </Link>
        </div>
    );
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center">
            <CardWrapper header={header} showHeader>
                {children}
            </CardWrapper>
        </div>
    );
}
