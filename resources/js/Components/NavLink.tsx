import { Link, InertiaLinkProps } from "@inertiajs/react";

import { cn } from "@/lib/utils";

type NavLinkProps = InertiaLinkProps & {
    active?: boolean;
};

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: NavLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                "flex text-sm transition duration-150 ease-in-out focus:outline-none focus:border-gray-300 gap-4 bg-transparent hover:bg-white/10 focus:bg-white/10 text-gray-100 w-full font-bold px-4 py-2",

                active ? "text-gray-950 bg-white/10" : "",
                className
            )}
        >
            {children}
        </Link>
    );
}
