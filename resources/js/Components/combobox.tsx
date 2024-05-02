import { useState } from "react";

import { cn } from "@/lib/utils";

import { InputTP24 } from "./ui/input-tp24";
import { ScrollArea } from "./ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type ComboboxItem = {
    value: string;
    label: string;
};

interface ComboboxProps {
    items: string[];
    id: string;
    className?: string;
    value?: string;
    label?: string;
    error?: string;
}

export const Combobox = ({
    items,
    id,
    className,
    value,
    label,
    error,
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [filteredList, setFilteredList] = useState(items);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (value !== "") {
            const list = items.filter((item) => {
                return item.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            });
            setFilteredList(list);
        } else {
            setFilteredList(items);
        }

        setSelectedValue(value);
    };

    const selectItem = (item: string) => {
        setSelectedValue(item);
        setOpen(false);
    };
    return (
        <div className={cn("w-full relative", className)}>
            <HoverCard open={open} onOpenChange={setOpen} openDelay={1}>
                <HoverCardTrigger>
                    <InputTP24
                        className="w-full"
                        value={selectedValue}
                        id={id}
                        onChange={handleChange}
                        onFocus={() => setOpen(true)}
                        label={label}
                        error={error}
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    <ScrollArea className="h-32 w-full">
                        {filteredList.length > 0 ? (
                            filteredList.map((item) => {
                                return (
                                    <div
                                        onClick={() => selectItem(item)}
                                        role="option"
                                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none 
                                        hover:bg-accent hover:text-accent-foreground
                                        focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        {item}
                                    </div>
                                );
                            })
                        ) : (
                            <div>kein Filterergebnis</div>
                        )}
                    </ScrollArea>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};
