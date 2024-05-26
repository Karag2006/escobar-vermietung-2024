import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { PickerReturn } from "@/types";
import {
    CollectAddressItem,
    customerType,
    documentType,
    SelectorItem,
} from "@/types/document";
import { blankForm, documentDataForm, documentForm } from "@/lib/document-form";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DatePicker } from "@/Components/datePicker";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { Combobox } from "@/Components/combobox";
import { TimePicker } from "@/Components/time-picker";
import { getCollectAddresses } from "@/data/document";
import { AddressCombobox } from "../address-combobox";
import { CurrencyInput } from "../currency-input";
import { CheckboxTP24 } from "@/Components/checkbox-tp24";
import { getPaymentTypes, getSettings } from "@/data/settings";

export const SettingsForm = () => {
    const floatToString = (floatValue: number) => {
        if (floatValue) return String(floatValue).replace(".", ",");
        return "";
    };
    const stringToFloat = (stringValue: string) => {
        if (stringValue) return parseFloat(stringValue.replace(",", "."));
        return 0.0;
    };

    const [currencyFields, setCurrencyFields] = useState({
        test1: "",
        test2: "",
        test3: "",
    });
    const [returnData, setReturnData] = useState({
        test1: 0,
        test2: 0,
        test3: 0,
    });

    const handleCurrencyInput = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setCurrencyFields({ ...currencyFields, [key]: value });
        setReturnData((data) => ({
            ...data,
            [key]: stringToFloat(value),
        }));
    };

    const handleValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        if (key === "test1") {
            const newTest2 = floatToString(2 * stringToFloat(value));
            setReturnData((data) => ({
                ...data,
                test2: stringToFloat(newTest2),
            }));
            setCurrencyFields({ ...currencyFields, test2: newTest2 });
        }

        if (key === "test2") {
            const newTest3 = 0.3 * returnData.test2;
            setReturnData((data) => ({
                ...data,
                test3: newTest3,
            }));
            setCurrencyFields({ ...currencyFields, test3: newTest3 });
        }
    };
    return (
        <div>
            <CurrencyInput
                className="w-full"
                id="test1"
                value={currencyFields.test1}
                label="Test 1"
                onValueChange={handleCurrencyInput}
                onFinishedValueChange={handleValueChanged}
            />
            <CurrencyInput
                className="w-full"
                id="test2"
                value={currencyFields.test2}
                label="Test 2"
                onValueChange={handleCurrencyInput}
                onFinishedValueChange={handleValueChanged}
            />
            <CurrencyInput
                className="w-full"
                id="test3"
                value={currencyFields.test3}
                label="Test 3"
                onValueChange={handleCurrencyInput}
                onFinishedValueChange={handleValueChanged}
                disabled
            />
        </div>
    );
};
