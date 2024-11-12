import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextareaTP24 = React.forwardRef<
    HTMLTextAreaElement,
    TextareaProps
>(({ className, label, error, id, value = "", ...props }, ref) => {
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
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full bg-transparent px-1 pb-1 pt-2 text-sm border-b-[1px] border-b-gray-300 focus:outline-0 hover:border-b-gray-600 focus:border-b-blue-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                id={id}
                ref={ref}
                value={value}
                {...props}
            />
            {error && error !== "" && (
                <p className="text-sm text-destructive mt-2">{error}</p>
            )}
        </div>
    );
});
TextareaTP24.displayName = "Textarea";
