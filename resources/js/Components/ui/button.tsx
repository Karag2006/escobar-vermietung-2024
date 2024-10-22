import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/70 rounded-md",

                success:
                    "bg-green-600 text-white hover:bg-green-600/70 rounded-md",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
                ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
                link: "text-primary underline-offset-4 hover:underline",

                accent: "bg-accent text-gray-100 hover:text-grey-300",

                navLink:
                    "bg-primary hover:bg-white/10 text-gray-100 w-full font-bold",
                primary:
                    "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs text-white uppercase tracking-widest rounded-md",
                icon: "bg-transparent text-current hover:text-current/80 focus:text-current/80",
                dropdown:
                    "justify-start rounded-none w-full bg-transparent text-current hover:bg-gray-200 focus:bg-gray-200",
                borderless: "border-none bg-transparent hover:bg-gray-300",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
                icon: "h-10 w-10",

                content: "p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, type, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                type={type ? type : "button"}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
