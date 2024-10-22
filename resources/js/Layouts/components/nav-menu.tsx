import { BookOpenCheck, KeyRound, Power } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import NavLink from "@/Components/NavLink";
import { Separator } from "@/Components/ui/separator";
import { ApplicationLogo } from "@/Components/ApplicationLogo";
import { useEffect, useState } from "react";
import Icon from "@/Components/icon";
import { useApi } from "@/hooks/use-api";
import { format } from "date-fns";

type NavMenuProps = {
    className?: string;
};

type NavItem = {
    id: number;
    link: string;
    name: string;
    icon: keyof typeof dynamicIconImports;
};

export const NavMenu = ({ className }: NavMenuProps) => {
    const month = format(new Date(), "yyyy-MM");
    const [navItems, setNavItems] = useState([]);
    useEffect(() => {
        async function getNavMenu() {
            const { navMenu } = await useApi();
            setNavItems(navMenu);
        }
        getNavMenu();
    }, []);
    return (
        <div className={className}>
            <ApplicationLogo />
            <Separator className="w-full my-2" />
            <nav className="block h-full w-full">
                <div className="flex flex-col gap-1">
                    {navItems?.map((item: NavItem) => {
                        return (
                            <NavLink
                                key={item?.id}
                                href={route(item?.link)}
                                active={route().current(item?.link)}
                                className="flex gap-4 items-center"
                            >
                                <Icon className="h-6 w-6" name={item.icon} />
                                <span>{item?.name}</span>
                            </NavLink>
                        );
                    })}

                    <NavLink
                        href={route("reservationTable", month)}
                        active={route().current("reservationTable", month)}
                    >
                        <BookOpenCheck className="h-6 w-6" />
                        <span className="inline-block">
                            Reservierungen Liste
                        </span>
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
