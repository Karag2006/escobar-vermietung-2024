import { CircleGauge, KeyRound, Power } from "lucide-react";
import NavLink from "@/Components/NavLink";
import { Separator } from "@/Components/ui/separator";
import ApplicationLogo from "@/Components/ApplicationLogo";

interface NavMenuProps {
    className?: string;
}

export const NavMenu = ({ className }: NavMenuProps) => {
    return (
        <div className={className}>
            <ApplicationLogo />
            <Separator className="w-full my-2" />
            <nav className="block h-full w-full">
                <div className="flex flex-col gap-1">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="flex gap-4"
                    >
                        <CircleGauge className="h-6 w-6" />
                        <span>Dashboard</span>
                    </NavLink>

                    <Separator className="w-full" />

                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        <KeyRound className="h-6 w-6" />
                        <span className="inline-block">Profile</span>
                    </NavLink>

                    <NavLink
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex gap-4"
                    >
                        <Power className="h-6 w-6" />
                        <span className="inline-block">Logout</span>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};
