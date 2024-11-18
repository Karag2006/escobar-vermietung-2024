import { useEffect, useState } from "react";
import { format } from "date-fns";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { CircleGauge, KeyRound, List, Power, Text } from "lucide-react";
import { FaChartLine } from "react-icons/fa";

import { useApi } from "@/hooks/use-api";

import NavLink from "@/Components/NavLink";
import { Separator } from "@/Components/ui/separator";
import { ApplicationLogo } from "@/Components/ApplicationLogo";
import Icon from "@/Components/icon";

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
                    {/* 04.11.2024 Feature: Month List
                    Removed Dashboard from navItems and added it here as a static link
                    in order to insert the reservationtable between the Dashboard and the next item */}
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        <CircleGauge className="h-6 w-6" />
                        <span className="inline-block">Dashboard</span>
                    </NavLink>
                    <NavLink
                        href={route("reservationTable", month)}
                        active={route().current("reservationTable", month)}
                    >
                        <List className="h-6 w-6" />
                        <span className="inline-block">Monatsübersicht</span>
                    </NavLink>
                    {navItems?.map((item: NavItem) => {
                        // 04.11.2024 Feature: Month List
                        // Removed Dashboard from navItems and added it above as a static link
                        if (item.id != 1)
                            return (
                                <NavLink
                                    key={item?.id}
                                    href={route(item?.link)}
                                    active={route().current(item?.link)}
                                    className="flex gap-4 items-center"
                                >
                                    <Icon
                                        className="h-6 w-6"
                                        name={item.icon}
                                    />
                                    <span>{item?.name}</span>
                                </NavLink>
                            );
                    })}
                    <NavLink
                        href={route("analysis")}
                        active={route().current("analysis")}
                    >
                        <FaChartLine className="h-6 w-6" />
                        <span className="inline-block">Auswertung</span>
                    </NavLink>
                    <Separator className="w-full" />
                    <NavLink
                        href={route("json")}
                        active={route().current("json")}
                    >
                        <Text className="h-6 w-6" />
                        <span className="inline-block">Rechnungstext</span>
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
