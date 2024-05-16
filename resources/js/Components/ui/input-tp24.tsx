import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffix?: React.ReactNode;
}

export const InputTP24 = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, id, value, suffix, ...props }, ref) => {
        return (
            <div className={cn("group relative", className)}>
                {label && label !== "" && (
                    <label
                        htmlFor={id}
                        className={cn(
                            "absolute top-1 left-0 text-gray-500 group-hover:text-gray-600 group-focus-within:text-blue-400 group-focus-within:text-xs group-focus-within:top-[-1rem] transition-all group-hover:cursor-text",
                            value && value !== "" && "text-xs top-[-1rem]",
                            error && error !== "" && "text-destructive"
                        )}
                    >
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "w-full border-b-[1px] border-b-gray-300 focus:outline-0 hover:border-b-gray-600 focus:border-b-blue-400 bg-transparent px-1 pb-1 pt-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
                        error && error !== "" && "border-destructive"
                    )}
                    ref={ref}
                    value={value}
                    {...props}
                />
                {error && error !== "" && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                )}
                {suffix && suffix !== "" && (
                    <div className="absolute right-1 bottom-[0.2rem]">
                        {suffix}
                    </div>
                )}
            </div>
        );
    }
);
InputTP24.displayName = "Input";
