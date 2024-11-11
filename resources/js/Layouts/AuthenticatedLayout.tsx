import { PropsWithChildren } from "react";
import { ApplicationLogo } from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import { ChevronLeft, KeyRound, Menu, Power, UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import { Separator } from "@/Components/ui/separator";
import { NavMenu } from "./components/nav-menu";
import { CardWrapper } from "@/Components/wrapper/card-wrapper";
import { PageTitle } from "@/Components/page-title";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Toaster } from "@/Components/ui/sonner";

interface AuthenticatedLayoutProps extends PropsWithChildren {
    user: User;
    header?: string;
    headerAction?: React.ReactNode;
    headerCenter?: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Authenticated({
    children,
    user,
    header,
    headerAction,
    headerCenter,
    footer,
}: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen w-full">
            <TooltipProvider>
                <Drawer direction="left">
                    <div className="flex w-full">
                        <div className="min-h-screen hidden sm:block bg-accent">
                            <NavMenu className="w-full max-w-[350px]" />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="p-4 mb-4 bg-white flex w-full items-center justify-between shadow-md">
                                <DrawerTrigger className="block sm:hidden m-4">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">
                                        Open Nav Menu
                                    </span>
                                </DrawerTrigger>
                                <p className="font-semibold text-xl">
                                    Escobar Anhängercenter
                                </p>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="inline-flex"
                                        >
                                            <UserIcon className="h-6 w-6 mr-2" />
                                            {user.name}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route("profile.edit")}
                                                className="flex gap-4"
                                            >
                                                <KeyRound className="h-6 w-6" />
                                                <span className="inline-block">
                                                    Profile
                                                </span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="flex gap-4"
                                            >
                                                <Power className="h-6 w-6" />
                                                <span className="inline-block">
                                                    Logout
                                                </span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardWrapper
                                header={
                                    <PageTitle
                                        title={header}
                                        center={headerCenter}
                                    >
                                        {headerAction}
                                    </PageTitle>
                                }
                                showHeader={header ? true : false}
                                footer={footer}
                            >
                                <main>{children}</main>
                                <Toaster richColors />
                            </CardWrapper>
                        </div>
                    </div>

                    <DrawerContent className="bg-accent text-accent-foreground min-h-screen max-w-[280px] flex flex-col sm:hidden">
                        <div className="relative">
                            <DrawerClose className="absolute top-[116px] -right-6">
                                <Button
                                    variant="accent"
                                    className="pl-0 pr-0 h-20 rounded-tl-none rounded-bl-none "
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                    <span className="sr-only">
                                        Close Nav Menu
                                    </span>
                                </Button>
                            </DrawerClose>
                            <ApplicationLogo />
                            <Separator className="w-full my-2" />
                        </div>
                        <NavMenu />
                    </DrawerContent>
                </Drawer>
            </TooltipProvider>
        </div>
    );
}
