import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, id, ...props }, ref) => {
        const errorClass = error && error !== "" ? "bg-destructive" : "";
        return (
            <div className={className}>
                {label && label !== "" && (
                    <label htmlFor={id} className="mb-2 inline-block">
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        errorClass
                    )}
                    ref={ref}
                    {...props}
                />
                {error && error !== "" && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
