import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PickerReturn } from "@/types";
import { CollectAddressItem } from "@/types/document";

import { Button } from "@/Components/ui/button";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { InputClearButton } from "@/Components/input-clear-button";

interface AddressComboboxProps {
    items: CollectAddressItem[];
    id: string;
    className?: string;
    value?: number;
    label?: string;
    error?: string;
    removeError?: () => void;
    onValueChange: (data: PickerReturn) => void;
}

export const AddressCombobox = ({
    items,
    id,
    className,
    value,
    label,
    error,
    removeError,
    onValueChange,
}: AddressComboboxProps) => {
    const ref = useRef<null | HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [filteredList, setFilteredList] = useState(items);
    const [filterValue, setFilterValue] = useState("");

    const onClickOutside = () => {
        setOpen(false);
    };

    const openPicker = () => {
        removeError && removeError();
        setOpen(true);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;

        if (inputValue !== "") {
            const list = items.filter((item) => {
                return (
                    item.name
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) !== -1
                );
            });
            setFilteredList(list);
        } else {
            setFilteredList(items);
        }

        setFilterValue(inputValue);
    };

    const selectItem = (item: CollectAddressItem) => {
        setFilteredList(items);
        onValueChange && onValueChange({ id, value: item.id });

        setOpen(false);
    };

    const clearValue = () => {
        setFilteredList(items);
        setFilterValue("");
        onValueChange && onValueChange({ id, value: 0 });
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

    useEffect(() => {
        setFilteredList(items);
    }, [items]);

    useEffect(() => {
        const index = filteredList.findIndex((item) => item.id === value);
        if (index === -1) setFilterValue("");

        setFilterValue(filteredList[index]?.name);
    }, [value]);

    return (
        <div className={cn("relative", className)} ref={ref}>
            <InputTP24
                id={id}
                className={className}
                value={filterValue}
                label={label}
                error={error}
                onFocus={openPicker}
                onChange={handleChange}
                suffix={
                    filterValue &&
                    filterValue !== "" && (
                        <InputClearButton clearValue={clearValue} />
                    )
                }
                suffixClasses="right-4 top-0"
                autoComplete="off"
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
                        {filteredList.map((item, index) => (
                            <Button
                                key={index}
                                role="selectItem"
                                type="button"
                                variant="dropdown"
                                onClick={() => selectItem(item)}
                            >
                                {typeof item === "string" ? item : item.name}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
