import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffix?: React.ReactNode;
    suffixClasses?: string;
    prefixElement?: React.ReactNode;
    prefixClasses?: string;
}

export const InputTP24 = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            label,
            error,
            id,
            value = "",
            disabled,
            suffix,
            suffixClasses,
            prefixElement,
            prefixClasses,
            ...props
        },
        ref
    ) => {
        return (
            <div
                className={cn(
                    "group relative",
                    className,
                    disabled && "opacity-50"
                )}
            >
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
                {prefixElement && prefixElement !== "" && (
                    <div
                        className={cn(
                            "absolute left-1 bottom-[0.17rem] hidden group-focus-within:block",
                            prefixClasses,
                            value && value !== "" ? "block" : ""
                        )}
                    >
                        {prefixElement}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "w-full border-b-[1px] border-b-gray-300 focus:outline-0 group-hover:border-b-gray-600 focus:border-b-blue-400 bg-transparent px-1 pb-1 pt-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed",
                        error && error !== "" && "border-destructive",
                        prefixElement && prefixElement !== "" ? "pl-5" : ""
                    )}
                    ref={ref}
                    disabled={disabled}
                    value={value}
                    {...props}
                />
                {error && error !== "" && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                )}
                {suffix && suffix !== "" && (
                    <div
                        className={cn(
                            "absolute right-1 bottom-[0.2rem]",
                            suffixClasses
                        )}
                    >
                        {suffix}
                    </div>
                )}
            </div>
        );
    }
);
InputTP24.displayName = "Input";
