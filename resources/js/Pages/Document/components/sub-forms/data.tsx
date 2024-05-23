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
import { getPaymentTypes } from "@/data/settings";

interface DataFormProps {
    type: "data";
    documentType: documentType;
    document: documentForm;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentDataForm
    ) => void;
}

export const DataForm = ({
    type,
    document,
    documentType,
    handleChangeInSubForm,
}: DataFormProps) => {
    const [collectAdresses, setCollectAdresses] = useState<
        CollectAddressItem[]
    >([]);
    const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(document.data);

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        handleChangeInSubForm(type, { ...data, [key]: value });
    };

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        handleChangeInSubForm(type, { ...data, [key]: value });
    };

    const handleComboChange = (result: PickerReturn) => {
        setData((data) => ({
            ...data,
            [result.id]: result.value,
        }));
        handleChangeInSubForm(type, { ...data, [result.id]: result.value });
    };

    useEffect(() => {
        getCollectAddresses().then((data) => {
            setCollectAdresses(data);
        });
        getPaymentTypes().then((data) => {
            setPaymentTypes(data);
        });
    }, []);

    return (
        <div className="p-4">
            <div className="flex gap-10 flex-col">
                <div className="flex gap-6 flex-col md:flex-row">
                    <DatePicker
                        value={data.collect_date}
                        id="collect_date"
                        label="Abholung - Datum *"
                        fieldName="collect_date"
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.collect_time}
                        id="collect_time"
                        label="Abholung - Uhrzeit *"
                        fieldName="collect_time"
                        onUpdateValue={handlePickerChange}
                    />
                    <DatePicker
                        value={data.return_date}
                        id="return_date"
                        label="Rückgabe - Datum *"
                        fieldName="return_date"
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.return_time}
                        id="return_time"
                        label="Rückgabe - Uhrzeit *"
                        fieldName="return_time"
                        onUpdateValue={handlePickerChange}
                    />
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <AddressCombobox
                        items={collectAdresses}
                        label="Abhol Anschrift *"
                        id="collect_address_id"
                        value={data.collect_address_id}
                        error={errors.collect_address_id}
                        removeError={() => clearErrors("collect_address_id")}
                        onValueChange={handlePickerChange}
                    />
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <CurrencyInput
                        className="w-full"
                        id="total_price"
                        value={data.total_price}
                        label="Preis (Brutto) *"
                        onValueChange={handleChange}
                    />
                    <CurrencyInput
                        className="w-full"
                        id="netto_price"
                        value={data.netto_price}
                        label="Netto Preis (automatisch)"
                        disabled
                        onValueChange={handleChange}
                    />
                    <CurrencyInput
                        className="w-full"
                        id="tax_value"
                        value={data.tax_value}
                        label="Umsatzsteuer (automatisch)"
                        disabled
                        onValueChange={handleChange}
                    />
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <CurrencyInput
                        className="w-full"
                        id="reservation_deposit_value"
                        value={data.reservation_deposit_value}
                        label="Anzahlung"
                        onValueChange={handleChange}
                    />
                    <DatePicker
                        className="w-full"
                        value={data.reservation_deposit_date}
                        id="reservation_deposit_date"
                        fieldName="reservation_deposit_date"
                        label="Anzahlung - bis Datum"
                        onUpdateValue={handlePickerChange}
                    />
                    <Combobox
                        className="w-full"
                        items={paymentTypes}
                        label="Zahlungsart Anzahlung"
                        id="reservation_deposit_type"
                        value={data.reservation_deposit_type}
                        onValueChange={handleComboChange}
                    />
                    <CheckboxTP24
                        id="reservation_deposit_recieved"
                        className="w-full"
                        checked={data.reservation_deposit_recieved}
                        label="Anzahlung eingegangen"
                        onCheckedChange={handlePickerChange}
                    />
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <CurrencyInput
                        id="final_payment_value"
                        value={data.final_payment_value}
                        label="Restzahlung"
                        onValueChange={handleChange}
                    />
                </div>
                <div className="flex gap-10 flex-col md:flex-row">
                    <TextareaTP24
                        className="w-full"
                        label="Kommentar"
                        id="comment"
                        value={data.comment}
                        error={errors.comment}
                        onChange={handleChange}
                        onFocus={() => clearErrors("comment")}
                        disabled={processing}
                    />
                </div>
            </div>
        </div>
    );
};
