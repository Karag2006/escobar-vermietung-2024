import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

import { InputTP24 } from "./ui/input-tp24";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    const ref = useRef<null | HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [filteredList, setFilteredList] = useState(items);

    const onClickOutside = () => {
        setOpen(false);
    };

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
        setFilteredList(items);
        setOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (
                ref.current &&
                e.target instanceof Element &&
                !ref.current.contains(e.target)
            ) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    return (
        <div className="relative w-full" ref={ref}>
            <InputTP24
                id={id}
                className={className}
                value={selectedValue}
                label={label}
                error={error}
                onFocus={() => setOpen(true)}
                onChange={handleChange}
            />
            <div className="absolute top-2 right-2 text-gray-600">
                {open ? (
                    <ChevronDown className="h-5 w-5" />
                ) : (
                    <ChevronUp className="h-5 w-5" />
                )}
            </div>

            {open ? (
                <div
                    className={cn(
                        "absolute top-10 left-0 bg-white z-10 w-full shadow-md"
                    )}
                >
                    <div role="selectGroup" className="flex flex-col">
                        {filteredList.map((item) => (
                            <Button
                                key={item}
                                role="selectItem"
                                type="button"
                                variant="dropdown"
                                onClick={() => selectItem(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
